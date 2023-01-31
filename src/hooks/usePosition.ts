import { useEffect, useState } from 'react'
import { Position, PositionError } from '../types/types'

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

  return {
    position,
    error,
    isAvailable: 'geolocation' in navigator && position !== null,
  }
}

export default usePosition
