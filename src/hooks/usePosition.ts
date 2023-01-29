import { useEffect, useState } from 'react'

export type Position = {
  latitude: number
  longitude: number
}

export type PositionError = {
  code: number
  message: string
}

const usePosition = () => {
  const [position, setPosition] = useState<Position | null>(null)
  const [error, setError] = useState<PositionError | null>(null)

  const onChange = ({ coords }: GeolocationPosition) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  const onError = (error: PositionError) => {
    setError(error)
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError({
        code: 0,
        message: 'Geolocation not supported',
      })
      return
    }

    const geo = navigator.geolocation
    const watcher = geo.watchPosition(onChange, onError)

    return () => geo.clearWatch(watcher)
  }, [])

  return { position, error }
}

export default usePosition
