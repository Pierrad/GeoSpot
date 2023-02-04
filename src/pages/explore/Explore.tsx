import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Webcam from 'react-webcam'
import { getSpot } from '../../api/spot'
import { QueryKey } from '../../config/keys'
import useOrientation from '../../hooks/useOrientation'
import usePosition from '../../hooks/usePosition'
import { getDistance } from '../../utils/distance'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import ThreeArrow from '../../components/threejs/ThreeArrow'
import ThreeCanvas from '../../components/threejs/ThreeCanvas'
import Alert from '../../components/Alert'

const Explore = () => {
  const {
    isLoading,
    position,
    orientation,
    spot,
    distance,
    mustRequestPermission,
    requestIOSPermission,
  } = useExplore()

  if (isLoading)
    return (
      <AuthLayout>
        <Loading />
      </AuthLayout>
    )

  if (!position)
    return (
      <AuthLayout>
        <Loading message="We're looking for your position" />
      </AuthLayout>
    )

  return (
    <AuthLayout>
      <TitleContainer>
        <BackButton />
        <Title>{`You are looking for ${spot?.name}`}</Title>
      </TitleContainer>
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
          <Canvas>
            <ThreeArrow
              spot={spot!}
              orientation={orientation}
              position={position}
            />
          </Canvas>
        </Scene>
        {mustRequestPermission && (
          <Alert
            open={mustRequestPermission}
            handleClose={requestIOSPermission}
            onAgree={requestIOSPermission}
            title="Permission needed"
            text="We need your permission to use your device orientation"
          />
        )}
      </Wrapper>
    </AuthLayout>
  )
}

const useExplore = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { position } = usePosition()
  const { orientation, mustRequestPermission, requestIOSPermission } =
    useOrientation()
  const [distance, setDistance] = useState<number>(-1)

  const { data: spot, isLoading } = useQuery(QueryKey.GET_SPOT, () =>
    getSpot(id!)
  )

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

  return {
    isLoading,
    position,
    orientation,
    spot,
    distance,
    mustRequestPermission,
    requestIOSPermission,
  }
}

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

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

const Canvas = styled(ThreeCanvas)`
  width: 100%;
  height: 100%;
  position: absolute !important;
`

export default Explore
