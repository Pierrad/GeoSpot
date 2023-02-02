/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-namespace */
import styled from '@emotion/styled'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import { QueryKey } from '../../config/keys'
import usePosition from '../../hooks/usePosition'
import { getDistance } from '../../utils/distance'
import Webcam from 'react-webcam'
import * as THREE from 'three'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import useOrientation from '../../hooks/useOrientation'
import { Orientation, Position, Spot } from '../../types/types'
import MapView from '../../components/Map'

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
    <mesh ref={arrowRef}>
      <coneGeometry />
      <meshBasicMaterial />
    </mesh>
  )
}

const VideoPlane = ({ video }: { video: THREE.VideoTexture }) => {
  const { viewport } = useThree()

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={video} />
    </mesh>
  )
}

const Explore = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { position } = usePosition()
  const orientation = useOrientation()
  const [distance, setDistance] = useState<number>(0)
  const [angle, setAngle] = useState<number>(0)

  const webcamRef = useRef<Webcam>(null)
  const videoRef = useRef<THREE.VideoTexture>()

  const {
    data: spot,
    isLoading,
    error,
  } = useQuery(QueryKey.GET_SPOT, () => getSpot(id!))

  useEffect(() => {
    if (position && spot?.geolocation) {
      setDistance(parseFloat(getDistance(position, spot?.geolocation)))
    }
  }, [spot?.geolocation, position])

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      videoRef.current = new THREE.VideoTexture(webcamRef.current.video)
    }
  }, [])

  useEffect(() => {
    if (orientation.alpha === undefined) return
    if (!position) return

    const calculateAngle = calculateBearing(
      position?.latitude,
      position?.longitude,
      spot?.geolocation.latitude,
      spot?.geolocation.longitude
    )

    setAngle(calculateAngle + orientation.alpha + 30)
  }, [position, spot?.geolocation, orientation])

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
        <Scene
          height={
            webcamRef.current && webcamRef.current.video
              ? // height of the video element
                webcamRef.current.video.videoHeight / 2
              : 200
          }
        >
          <Webcam
            style={{
              position: 'absolute',
              width: '100%',
            }}
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <MyCanvas
            camera={{
              fov: 75,
              aspect:
                webcamRef.current && webcamRef.current.video
                  ? webcamRef.current.video.videoWidth /
                    webcamRef.current.video.videoHeight
                  : 1,
            }}
          >
            <Arrow spot={spot!} orientation={orientation} position={position} />
            {videoRef.current && <VideoPlane video={videoRef.current} />}
          </MyCanvas>
        </Scene>

        <CompassContainer>
          <CompassDialer>
            <CompassArrow
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            />
            <CompassTarget>Target</CompassTarget>
          </CompassDialer>
          <CompassLabel>Compass</CompassLabel>
        </CompassContainer>

        <MapView marker={spot?.geolocation} />
      </Wrapper>
    </AuthLayout>
  )
}

function calculateBearing(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const angle = Math.atan2(lng2 - lng1, lat2 - lat1) // radians
  const bearing = (angle * 180) / Math.PI // convert to degrees
  return (bearing + 360) % 360 // normalize
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

const Scene = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height}px;
  position: relative;
`

const MyCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
`

const CompassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const CompassDialer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border: 10px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
`

const CompassArrow = styled.div`
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  width: 30px;
  height: 30px;
  transform-origin: center;
  transform: rotate(0deg);
  border-bottom: 2px solid red;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
`

const CompassTarget = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`

const CompassLabel = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`

export default Explore
