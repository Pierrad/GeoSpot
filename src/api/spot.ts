import { call } from './call'

export const addSpot = async (data: any) => {
  const response = await call('place', {
    method: 'POST',
    body: data,
  })

  return response
}
