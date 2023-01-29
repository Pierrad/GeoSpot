import { login } from '../api/auth'
import Layout from '../components/Layout'
import { QueryKey } from '../config/keys'
import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoading, mutate, isSuccess } = useMutation(login, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.ME),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = { email, password }
    mutate(user)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
  })

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <h1>Sign in</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </LoadingButton>
          <Link to="/signup">Don&apos;t have an account? Sign Up</Link>
        </Box>
      </Box>
    </Layout>
  )
}

export default SignIn
