import { IconButton } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

type BackButtonProps = {
  onClick?: () => void
}

const BackButton = (props: BackButtonProps) => {
  const { onClick } = props
  const navigate = useNavigate()
  return (
    <IconButton
      onClick={() => (onClick ? onClick() : navigate(-1))}
      sx={{ mb: 0 }}
    >
      <KeyboardBackspaceIcon />
    </IconButton>
  )
}

export default BackButton
