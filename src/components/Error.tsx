import { Alert, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

type ErrorProps = {
  className?: string
  message?: string
}

const Error = (props: ErrorProps) => {
  const { className, message } = props
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Snackbar
      className={className}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message ?? 'An error occured'}
      </Alert>
    </Snackbar>
  )
}

export default Error
