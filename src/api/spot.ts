import { call } from './call'

export const addSpot = async (data: any) => {
  const response = await call('place', {
    method: 'POST',
    body: data,
  })

  return response
}

export const addDiscoveredSpot = async (data: any) => {
  const response = await call('place/discovered', {
    method: 'POST',
    body: data,
  })

  return response
}

export const getDiscoveredSpots = async () => {
  const response = await call('user/discovered')

  return response
}

export const getCreatedSpots = async () => {
  const response = await call('user/created')

  return response
}

export const getDiscoveredSpot = async (id: string) => {
  const response = await call(`user/discovered/${id}`)

  return response
}

export const getCreatedSpot = async (id: string) => {
  const response = await call(`user/created/${id}`)

  return response
}

export const getSpot = async (id: string) => {
  const response = await call(`place/${id}`)

  return response
}

export const getAroundSpots = async (data: any) => {
  console.log(data)
  const response = await call('place/around', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return response
}
