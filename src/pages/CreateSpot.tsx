import styled from '@emotion/styled'
import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { addSpot } from '../api/spot'
import AuthLayout from '../components/AuthLayout'
import usePosition from '../hooks/usePosition'

const CreateSpot = () => {
  const navigate = useNavigate()
  const { position } = usePosition()
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const { isLoading, mutate, isSuccess } = useMutation(addSpot)

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
    }
  }, [isSuccess, navigate])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image ?? '')
    formData.append(
      'geolocation',
      JSON.stringify({
        latitude: position?.latitude,
        longitude: position?.longitude,
      })
    )
    mutate(formData)
  }

  return (
    <AuthLayout>
      <Box component="div" sx={{ m: 1 }}>
        <Title>Add a new spot 📍</Title>
        <Subtitle>Share your favorite spots with the community</Subtitle>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            sx={{ mt: 3 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload image 📸
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </Button>
          {image && (
            <Preview src={URL.createObjectURL(image)} alt={image?.name} />
          )}
          <Note>
            We&apos;ll use your current location to add the spot to the map
          </Note>
          <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={!name || !image}
          >
            Add spot
          </LoadingButton>
        </Box>
      </Box>
    </AuthLayout>
  )
}

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0.5rem 0;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

const Preview = styled.img`
  width: 100%;
  margin-top: 1rem;
`

const Note = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  margin: 0.5rem 0;
`

export default CreateSpot
