import Layout from '../components/Layout'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" onClick={() => navigate('signin')}>
          SignIn
        </Button>
        <Button variant="contained" onClick={() => navigate('signup')}>
          SignUp
        </Button>
      </Box>
    </Layout>
  )
}

export default Home
