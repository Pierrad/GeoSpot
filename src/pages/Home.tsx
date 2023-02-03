import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button } from '@mui/material'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Container>
        <Title>
          Join the GeoSpot Adventure and <i>discover</i> hidden gems around the
          world!
        </Title>
        <CTA onClick={() => navigate('signup')}>Let&apos;s go!</CTA>
        <Image src="/earth.png" alt="Earth" />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 0.8rem;
  height: 90vh;
  padding: 0 0.5rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  margin: 0.5rem 0;
  text-align: center;

  i {
    font-style: bold;
    color: #f50057;
  }
`

const Image = styled.img`
  position: absolute;
  width: 125%;
  bottom: -5%;
  left: -40%;

  @media (min-width: 768px) {
    width: 100%;
    bottom: -50%;
    left: -30%;
  }
`

const CTA = styled(Button)`
  z-index: 100;
  background: #f50057;
  border-radius: 999px;
  box-shadow: #f50057 0 10px 20px -10px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-family: Inter, Helvetica, 'Apple Color Emoji', 'Segoe UI Emoji',
    NotoColorEmoji, 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji',
    EmojiSymbols, -apple-system, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue',
    'Noto Sans', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 1rem 2rem;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: fit-content;
  word-break: break-word;
  border: 0;
  margin-top: 2rem;

  &:hover {
    background: #f50057;
    box-shadow: #f50057 0 10px 20px -10px;
  }

  &:active {
    background: #f50057;
    box-shadow: #f50057 0 10px 20px -10px;
  }
`

export default Home
