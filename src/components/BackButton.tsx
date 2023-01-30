import { IconButton } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
      <KeyboardBackspaceIcon />
    </IconButton>
  )
}

export default BackButton
