import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Fireworks } from '@fireworks-js/react'
import { addDiscoveredSpot, getSpot } from '../../api/spot'
import { QueryKey } from '../../config/keys'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import MapView from '../../components/Map'

const Found = () => {
  const { data, isLoading, isError, onBackButtonClick, showFireworks } =
    useFound()

  if (isLoading)
    return (
      <AuthLayout>
        <Loading />
      </AuthLayout>
    )

  const { name, creator, geolocation } = data

  return (
    <AuthLayout>
      {isError && <Error />}
      <Title>
        <BackButton onClick={onBackButtonClick} />
        {`You found ${name}`}
      </Title>
      <Wrapper>
        <Creator>{`This spot was created by ${creator.pseudo} on ${new Date(
          creator.created_at
        ).toLocaleDateString('en-US')}`}</Creator>
        <MapView marker={geolocation} />
        {showFireworks && (
          <Fireworks
            options={{
              rocketsPoint: {
                min: 0,
                max: 100,
              },
            }}
            style={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'fixed',
              background: 'transparent',
            }}
          />
        )}
      </Wrapper>
    </AuthLayout>
  )
}

const useFound = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showFireworks, setShowFireworks] = useState(true)

  const { data, isLoading } = useQuery(QueryKey.GET_SPOT, () => getSpot(id!))
  const { mutate, isError } = useMutation(addDiscoveredSpot, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.DISCOVERED_SPOTS)
      queryClient.invalidateQueries(QueryKey.GET_DISCOVERED_SPOT)
    },
  })

  useEffect(() => {
    if (id && !isSubmitted) {
      mutate({ id_place: id })
      setIsSubmitted(true)
    }
  }, [id, isSubmitted, mutate])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFireworks(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const onBackButtonClick = () => {
    navigate('/dashboard')
  }

  return {
    data,
    isLoading,
    isError,
    navigate,
    onBackButtonClick,
    showFireworks,
  }
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

export const Creator = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

export default Found
