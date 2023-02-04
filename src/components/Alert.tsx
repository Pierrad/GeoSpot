import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

type AlertProps = {
  open: boolean
  handleClose: () => void
  onAgree: () => void
  title: string
  text: string
}

const Alert = (props: AlertProps) => {
  const { open, handleClose, onAgree, title, text } = props
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alert
