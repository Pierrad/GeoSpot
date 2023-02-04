import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { me } from '../api/auth'
import { QueryKey } from '../config/keys'

type UseAuth = {
  user: any
  error: any
  isLoading: boolean
}

const useAuth = (): UseAuth => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useQuery(QueryKey.ME, me)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token || error) {
      navigate('/signin')
    }
  }, [error, navigate, token])

  const user = data?.user

  return { user, isLoading, error }
}

export default useAuth
