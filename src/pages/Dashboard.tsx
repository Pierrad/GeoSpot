import { me } from '../api/auth'
import AuthLayout from '../components/AuthLayout'
import { QueryKey } from '../config/keys'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { useQuery } from 'react-query'

const Dashboard = () => {
  const { data } = useQuery(QueryKey.ME, me)
  const user = data?.user

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>Hello {user?.pseudo} 👋</Title>
        <CTAs>
          <CreateCTA variant="contained">Create a new spot 📍</CreateCTA>
          <ExploreCTA variant="contained">Explore the world 🌍</ExploreCTA>
        </CTAs>
      </Box>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

const CTAs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
  margin-top: 3rem;
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
