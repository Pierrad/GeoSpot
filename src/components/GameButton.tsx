import styled from '@emotion/styled'
import { Button } from '@mui/material'

type GameButtonProps = {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const GameButton = (props: GameButtonProps) => {
  const { className, onClick } = props
  return (
    <CTA className={className} onClick={onClick}>
      {props.children}
    </CTA>
  )
}

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

export default GameButton
