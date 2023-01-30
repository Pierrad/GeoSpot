import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getCreatedSpot, getDiscoveredSpot } from '../../api/spot'
import AuthLayout from '../../components/AuthLayout'
import BackButton from '../../components/BackButton'
import { QueryKey } from '../../config/keys'
import { Spot as SpotType } from '../../types/types'

const Spot = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [isCreator, setIsCreator] = useState(false)
  const [isExplorer, setIsExplorer] = useState(false)
  if (!id) navigate('/dashboard')

  useEffect(() => {
    if (searchParams.get('creator')) setIsCreator(true)
    if (searchParams.get('explorer')) setIsExplorer(true)
  }, [searchParams])

  const {
    data: spot,
    isLoading,
    error,
  } = useQuery(QueryKey.GET_SPOT, () =>
    isCreator ? getCreatedSpot(id!) : getDiscoveredSpot(id!)
  )

  if (isLoading) return <p>Loading...</p>

  if (error) navigate('/dashboard')

  const { name }: SpotType = spot

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>
          <BackButton />
          {name}
        </Title>
        <Subtitle>
          {isCreator && `You created this spot on ${new Date(spot.created_at)}`}
          {isExplorer && `You discovered this spot on ${spot.date}`}
        </Subtitle>
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

export default Spot
