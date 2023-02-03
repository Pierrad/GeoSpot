import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getCreatedSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import Loading from '../../components/Loading'
import MapView from '../../components/Map'
import { QueryKey } from '../../config/keys'
import { getImageUrl } from '../../utils/api'

const CreatedSpotDetail = () => {
  const { isLoading, name, created_at, image, geolocation } =
    useCreatedSpotDetail()

  if (isLoading)
    return (
      <AuthLayout>
        <Loading />
      </AuthLayout>
    )

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>
          <BackButton />
          {name}
        </Title>
        <Subtitle>
          {`You created this spot on ${new Date(created_at).toLocaleDateString(
            'en-US'
          )}`}
        </Subtitle>
        <Image src={getImageUrl(image)} alt={name} />
        <MapView marker={geolocation} />
      </Box>
    </AuthLayout>
  )
}

const useCreatedSpotDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  if (!id) navigate('/dashboard')

  const {
    data: spot,
    isLoading,
    error,
  } = useQuery(QueryKey.GET_CREATED_SPOT, () => getCreatedSpot(id!))

  if (error) navigate('/dashboard')

  return { isLoading, ...spot }
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

export default CreatedSpotDetail
