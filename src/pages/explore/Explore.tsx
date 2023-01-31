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
import { Orientation, Spot } from '../../types/types'

type ArrowProps = {
  spot: Spot
  orientation: Orientation
}

const Arrow = (props: ArrowProps) => {
  const { spot, orientation } = props
  const arrowRef = useRef<THREE.Mesh | null>(null)

  const { longitude, latitude } = spot.geolocation
  const { alpha, beta, gamma } = orientation

  useFrame(() => {
    if (arrowRef.current) {
      const spotDirection = new THREE.Vector3(
        Math.cos(latitude) * Math.cos(longitude),
        Math.sin(latitude),
        Math.cos(latitude) * Math.sin(longitude)
      ).normalize()

      arrowRef.current.rotation.y = -longitude

      arrowRef.current.lookAt(spotDirection)
    }
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
            <Arrow spot={spot!} orientation={orientation} />
            {videoRef.current && <VideoPlane video={videoRef.current} />}
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

export default Explore
