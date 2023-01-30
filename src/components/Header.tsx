import styled from '@emotion/styled'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <Head>
      <LogoContainer onClick={() => navigate('/')}>
        <Logo src="/geospot.png" alt="GeoSpot" />
        <Title>GeoSpot</Title>
      </LogoContainer>
      <IconButton onClick={() => navigate('/dashboard')}>
        <PersonPinIcon fontSize="large" color="action" />
      </IconButton>
    </Head>
  )
}

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
`

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
`

export default Header
