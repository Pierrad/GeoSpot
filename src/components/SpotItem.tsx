import styled from '@emotion/styled'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Position, Spot } from '../types/types'
import { getDistance } from '../utils/distance'

type SpotItemProps = {
  className?: string
  spot: Spot
  onClick: () => void
  showDistance?: boolean
  currentPosition?: Position
}

const SpotItem = (props: SpotItemProps) => {
  const { className, spot, onClick, showDistance, currentPosition } = props
  return (
    <CustomSpot className={className} onClick={onClick}>
      <SpotPin>📍</SpotPin>
      <SpotContent>
        <SpotName>{spot.name}</SpotName>
        {showDistance && currentPosition && (
          <SpotDistance>
            {getDistance(currentPosition, spot.geolocation)} km
          </SpotDistance>
        )}
      </SpotContent>
      <Chevron />
    </CustomSpot>
  )
}

const CustomSpot = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  width: 49%;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`

const SpotPin = styled.span`
  font-size: 2rem;
`

const SpotContent = styled.div`
  display: flex;
  flex-direction: column;
`

const SpotName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
`

const SpotDistance = styled.p`
  font-size: 0.9rem;
  margin: 0;
`

const Chevron = styled(ChevronRightIcon)`
  font-size: 2rem;
`

export default SpotItem
