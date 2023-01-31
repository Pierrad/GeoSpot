import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getDiscoveredSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import MapView from '../../components/Map'
import { QueryKey } from '../../config/keys'
import { DiscoveredSpot as DiscoveredSpotType } from '../../types/types'
import { getImageUrl } from '../../utils/api'

const Spot = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  if (!id) navigate('/dashboard')

  const {
    data: spot,
    isLoading,
    error,
  } = useQuery(QueryKey.GET_DISCOVERED_SPOT, () => getDiscoveredSpot(id!))

  if (isLoading) return <p>Loading...</p>

  if (error) navigate('/dashboard')

  const { date, place }: DiscoveredSpotType = spot

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>
          <BackButton />
          {place.name}
        </Title>
        <Subtitle>{`You discovered this spot on ${date}`}</Subtitle>
        <Image src={getImageUrl(place.image)} alt={place.name} />
        <MapView marker={place.geolocation} />
      </Box>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

const Image = styled.img`
  width: 100%;
`

export default Spot
