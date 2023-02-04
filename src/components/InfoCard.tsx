import styled from '@emotion/styled'

type InfoCardProps = {
  className?: string
  backgroundColor: string
  color?: string
  text: string
  value: string
  onClick: () => void
}

const InfoCard = (props: InfoCardProps) => {
  const { className, backgroundColor, color, text, value, onClick } = props

  return (
    <Card
      className={className}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      <Value color={color}>{value}</Value>
      <Text>{text}</Text>
    </Card>
  )
}

const Card = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`

const Value = styled.h1<{ color?: string }>`
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
  color: ${(props) => props.color || '#000'};
`

const Text = styled.p`
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
  min-height: 4rem;
  display: flex;
  align-items: center;
`

export default InfoCard
