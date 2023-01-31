import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { DiscoveredSpot, Spot } from '../types/types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useNavigate } from 'react-router-dom'
import SpotItem from './SpotItem'

type SpotsListProps = {
  className?: string
  title: string
  spots?: Spot[]
  discoveredSpots?: DiscoveredSpot[]
}

const SpotsList = (props: SpotsListProps) => {
  const { className, title, spots, discoveredSpots } = props
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isSpot, setIsSpot] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (spots) setIsSpot(true)
  }, [spots])

  const renderSpot = (spot: Spot) => {
    return (
      <SpotItem
        spot={spot}
        key={spot.id}
        onClick={() =>
          navigate(`/${isSpot ? 'created' : 'discovered'}/${spot.id}`)
        }
      />
    )
  }

  const renderSpots = (spots: Spot[]) => (
    <CustomSpots>{spots?.map((spot) => renderSpot(spot))}</CustomSpots>
  )

  const renderDiscoveredSpots = (spots: DiscoveredSpot[]) => (
    <CustomSpots>{spots?.map((spot) => renderSpot(spot.place))}</CustomSpots>
  )

  return (
    <Card className={className} onClick={() => setIsExpanded(!isExpanded)}>
      <Title>{title}</Title>
      {spots && isExpanded && renderSpots(spots)}
      {discoveredSpots && isExpanded && renderDiscoveredSpots(discoveredSpots)}
      {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </Card>
  )
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 0.5rem 0;
`

const CustomSpots = styled.ul`
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default SpotsList
