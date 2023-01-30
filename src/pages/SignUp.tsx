import { register } from '../api/auth'
import Layout from '../components/Layout'
import { QueryKey } from '../config/keys'
import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const { pseudo, email, password, handleChange, handleSubmit, isLoading } =
    useSignUpForm()

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
        <h1>Sign up</h1>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="pseudo"
            label="Pseudo"
            name="pseudo"
            autoComplete="pseudo"
            autoFocus
            value={pseudo}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            Sign up
          </LoadingButton>
          <Link to="/signin">Already have an account? Sign in</Link>
        </Box>
      </Box>
    </Layout>
  )
}

const useSignUpForm = () => {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoading, mutate, data } = useMutation(register, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.ME),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'pseudo') {
      setPseudo(value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = { pseudo, email, password }
    mutate(user)
  }

  useEffect(() => {
    if (data?.token) {
      navigate('/dashboard')
    }
  }, [data?.token, navigate])

  return {
    pseudo,
    email,
    password,
    handleChange,
    handleSubmit,
    isLoading,
  }
}

export default SignUp
