import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import BackButton from './BackButton'

type LoadingProps = {
  className?: string
  message?: string
}

const Loading = (props: LoadingProps) => {
  const { className, message } = props
  const [loadingDots, setLoadingDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingDots.length < 3) {
        setLoadingDots(loadingDots + '.')
      } else {
        setLoadingDots('')
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [loadingDots])

  return (
    <Container className={className}>
      <Title>
        <BackButton />
        {message ?? 'Loading'}
        {loadingDots}
      </Title>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`
const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

export default Loading
