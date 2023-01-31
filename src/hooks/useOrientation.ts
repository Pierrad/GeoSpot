import { useEffect, useState } from 'react'
import { Orientation } from '../types/types'

const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      })
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  return orientation
}

export default useOrientation
