import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { addDiscoveredSpot, getSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import MapView from '../../components/Map'
import { QueryKey } from '../../config/keys'

const Found = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, isLoading } = useQuery(QueryKey.GET_SPOT, () => getSpot(id!))
  const { mutate } = useMutation(addDiscoveredSpot, {
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

  if (isLoading) return <div>Loading...</div>

  const { name, creator, geolocation } = data

  return (
    <AuthLayout>
      <Title>
        <BackButton onClick={() => navigate('/dashboard')} />
        {`You found ${name} 🎉`}
      </Title>
      <Wrapper>
        <Creator>{`This spot was created by ${creator.pseudo} on ${new Date(
          creator.created_at
        )}`}</Creator>

        <MapView marker={geolocation} />
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

export const Creator = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

export default Found
