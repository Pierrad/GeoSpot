/* eslint-disable react/no-unknown-property */
import styled from '@emotion/styled'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import { QueryKey } from '../../config/keys'
import usePosition from '../../hooks/usePosition'
import { calculateBearing, getDistance } from '../../utils/distance'
import Webcam from 'react-webcam'
import * as THREE from 'three'
import { useFrame, Canvas } from '@react-three/fiber'
import useOrientation from '../../hooks/useOrientation'
import { Orientation, Position, Spot } from '../../types/types'

type ArrowProps = {
  spot: Spot
  orientation: Orientation
  position: Position
}

const Arrow = (props: ArrowProps) => {
  const { spot, orientation, position } = props
  const arrowRef = useRef<THREE.Mesh | null>(null)

  const { longitude, latitude } = spot.geolocation
  const { alpha } = orientation

  useFrame(() => {
    if (!arrowRef.current) return

    const calculateAngle = calculateBearing(
      position?.latitude,
      position?.longitude,
      latitude,
      longitude
    )

    const angle = calculateAngle - alpha + 210

    arrowRef.current.rotation.z = angle * (Math.PI / 180)
  })

  return (
    <mesh ref={arrowRef} position={[0, 2.5, 0]}>
      <coneGeometry />
      <meshBasicMaterial />
    </mesh>
  )
}

const Explore = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { position } = usePosition()
  const orientation = useOrientation()
  const [distance, setDistance] = useState<number>(-1)

  const {
    data: spot,
    isLoading,
    error,
  } = useQuery(QueryKey.GET_SPOT, () => getSpot(id!))

  const checkIfFound = useCallback(() => {
    if (distance < 0.1 && distance > 0 && spot?.geolocation) {
      navigate(`/found/${id}`)
    }
  }, [distance, id, navigate, spot?.geolocation])

  useEffect(() => {
    if (position && spot?.geolocation) {
      setDistance(parseFloat(getDistance(position, spot?.geolocation)))
    }
  }, [spot?.geolocation, position])

  useEffect(() => {
    const detectionInterval = setInterval(() => {
      checkIfFound()
    }, 10000)

    return () => {
      clearInterval(detectionInterval)
    }
  }, [checkIfFound])

  if (!id) navigate('/dashboard')
  if (isLoading) return <AuthLayout>Loading...</AuthLayout>
  if (error) navigate('/dashboard')
  if (!position) return <AuthLayout>Position not available</AuthLayout>

  return (
    <AuthLayout>
      <Title>
        <BackButton />
        {`You are looking for ${spot?.name}`}
      </Title>
      <Wrapper>
        <Distance>{`You are ${distance} km away from ${spot?.name}`}</Distance>
        <Scene>
          <Webcam
            audio={false}
            videoConstraints={{
              width: window.innerWidth,
              height: 250,
              facingMode: {
                exact: 'environment',
              },
            }}
          />
          <MyCanvas
            camera={{
              fov: 75,
            }}
          >
            <Arrow spot={spot!} orientation={orientation} position={position} />
          </MyCanvas>
        </Scene>
      </Wrapper>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`

const Distance = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

const Scene = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const MyCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
  position: absolute !important;
`

export default Explore
