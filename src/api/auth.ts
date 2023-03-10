import { call } from './call'

export const register = async (data: any) => {
  const response = await call('register', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (response.status === 401) {
    throw new Error('Invalid credentials')
  }

  if (response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}

export const login = async (data: any) => {
  const response = await call('login', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (response.status === '401') {
    throw new Error('Invalid credentials')
  }

  if (response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}

export const me = async () => {
  const response = await call('me', {
    method: 'GET',
  })

  if (response.token) {
    localStorage.setItem('token', response.token)
  }

  return response
}
