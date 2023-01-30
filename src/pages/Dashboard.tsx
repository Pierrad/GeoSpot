import AuthLayout from '../components/AuthLayout'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import InfoCard from '../components/InfoCard'
import { QueryKey } from '../config/keys'
import { useQuery } from 'react-query'
import { getCreatedSpots, getDiscoveredSpots } from '../api/spot'
import SpotsList from '../components/SpotsList'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
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
          />
          <CustomInfoCard
            backgroundColor="#f5f5f5"
            color="#4271ff"
            text={`${createdSpots?.length === 1 ? 'spot' : 'spots'} created`}
            value={createdSpots?.length ?? 0}
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
          />
        )}
        {createdSpots && createdSpots?.length > 0 && (
          <CustomSpotList title="Your spots" spots={createdSpots} />
        )}
      </Box>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
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

const CTA = styled(Button)`
  align-items: center;
  appearance: none;

  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: 'JetBrains Mono', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
`

const CreateCTA = styled(CTA)`
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #5adaff 0,
    #5468ff 100%
  );
`

const ExploreCTA = styled(CTA)`
  background-image: radial-gradient(
    100% 100% at 100% 0,
    #ff5a5a 0,
    #ff5468 100%
  );
`

export default Dashboard
