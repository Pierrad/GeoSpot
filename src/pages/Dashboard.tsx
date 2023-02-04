import AuthLayout from '../components/AuthLayout'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import InfoCard from '../components/InfoCard'
import { QueryKey } from '../config/keys'
import { useQuery } from 'react-query'
import { getCreatedSpots, getDiscoveredSpots } from '../api/spot'
import SpotsList from '../components/SpotsList'
import { useState } from 'react'
import GameButton from '../components/GameButton'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isCreatedSpotsExpanded, setIsCreatedSpotsExpanded] = useState(false)
  const [isDiscoveredSpotsExpanded, setIsDiscoveredSpotsExpanded] =
    useState(false)
  const { data: discoveredSpots } = useQuery(
    QueryKey.DISCOVERED_SPOTS,
    getDiscoveredSpots
  )
  const { data: createdSpots } = useQuery(
    QueryKey.CREATED_SPOTS,
    getCreatedSpots
  )

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>Hello {user?.pseudo} 👋</Title>
        <InfoCards>
          <CustomInfoCard
            backgroundColor="#f5f5f5"
            color="#ff9742"
            text={`${
              discoveredSpots?.length === 1 ? 'spot' : 'spots'
            } discovered`}
            value={discoveredSpots?.length ?? 0}
            onClick={() =>
              setIsDiscoveredSpotsExpanded(!isDiscoveredSpotsExpanded)
            }
          />
          <CustomInfoCard
            backgroundColor="#f5f5f5"
            color="#4271ff"
            text={`${createdSpots?.length === 1 ? 'spot' : 'spots'} created`}
            value={createdSpots?.length ?? 0}
            onClick={() => setIsCreatedSpotsExpanded(!isCreatedSpotsExpanded)}
          />
        </InfoCards>
        <CTAs>
          <CreateCTA onClick={() => navigate('/create')}>
            Add a new spot 📍
          </CreateCTA>
          <ExploreCTA onClick={() => navigate('/explore')}>
            Explore the world 🌍
          </ExploreCTA>
        </CTAs>
        {discoveredSpots && discoveredSpots?.length > 0 && (
          <CustomSpotList
            title="Discovered spots"
            discoveredSpots={discoveredSpots}
            isExpanded={isDiscoveredSpotsExpanded}
            onClick={() =>
              setIsDiscoveredSpotsExpanded(!isDiscoveredSpotsExpanded)
            }
          />
        )}
        {createdSpots && createdSpots?.length > 0 && (
          <CustomSpotList
            title="Your spots"
            spots={createdSpots}
            isExpanded={isCreatedSpotsExpanded}
            onClick={() => setIsCreatedSpotsExpanded(!isCreatedSpotsExpanded)}
          />
        )}
      </Box>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 0.5rem 0;
  text-align: center;
  color: #757575;
`

const InfoCards = styled.div`
  display: flex;
  & > :first-of-type {
    width: 50%;
    margin-right: 0.25rem;
  }
  & > :last-of-type {
    width: 50%;
    margin-left: 0.25rem;
  }
`

const CustomInfoCard = styled(InfoCard)`
  margin: 1rem 0;
`

const CTAs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  margin-top: 1rem;
`

const CustomSpotList = styled(SpotsList)`
  margin: 2rem 0 0 0;
`

const CreateCTA = styled(GameButton)`
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #5468ff 100%
  );
`

const ExploreCTA = styled(GameButton)`
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #ff5a5a 0,
    #ff5468 100%
  );
`

export default Dashboard
