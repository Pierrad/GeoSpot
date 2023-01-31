import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getAroundSpots } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import SpotItem from '../../components/SpotItem'
import { QueryKey } from '../../config/keys'
import usePosition from '../../hooks/usePosition'
import { Spot } from '../../types/types'

const ExploreList = () => {
  const { position, isAvailable } = usePosition()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(
    isAvailable ? QueryKey.GET_AROUND_SPOTS : '',
    () => {
      if (position) {
        return getAroundSpots({
          geolocation: JSON.stringify(position),
          radius: 1000,
        })
      }
    },
    {
      enabled: isAvailable,
    }
  )

  if (isLoading) return <AuthLayout>Loading...</AuthLayout>

  if (!position) return <AuthLayout>Position not available</AuthLayout>

  console.log('data', data)

  return (
    <AuthLayout>
      <Title>
        <BackButton />
        Explore 🌎
      </Title>
      <Spots>
        {data?.map((spot: Spot) => (
          <CustomSpot
            spot={spot}
            key={spot.id}
            onClick={() => navigate(`/explore/${spot.id}`)}
            showDistance
            currentPosition={position}
          />
        ))}
      </Spots>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

const Spots = styled.ul`
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`

const CustomSpot = styled(SpotItem)`
  width: 100%;
  margin: 0.5rem 0;
`

export default ExploreList
