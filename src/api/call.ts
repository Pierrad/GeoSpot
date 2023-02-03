// export a function that can make a call to the API and return the response (all HTTP methods) with the correct headers with fetch
import APP from '../config/app'

type HeaderType = {
  [key: string]: string
}

export const call = async (
  endpoint: string,
  options: any = {},
  isFormData = false
): Promise<any> => {
  const url = `${APP.API_URL}/${endpoint}`
  const headers: HeaderType = {
    ...options.headers,
  }
  const token = window.localStorage.getItem('token')

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if ((options.method === 'POST' || options.method === 'PUT') && !isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, { headers, ...options })
  try {
    return await response.json()
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
