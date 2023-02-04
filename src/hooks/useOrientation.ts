import { useEffect, useState } from 'react'
import { Orientation } from '../types/types'

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>
  webkitCompassHeading?: number
}

const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })
  const [mustRequestPermission, setMustRequestPermission] = useState(false)
  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission

  window.addEventListener('oncompassneedscalibration', function () {
    alert('Your device needs to be calibrated. Wave it in a figure 8 pattern')
  })

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if ((event as DeviceOrientationEventiOS).webkitCompassHeading) {
      console.log('[ORIENTATION] using webkitCompassHeading')
      setOrientation({
        alpha: (event as DeviceOrientationEventiOS).webkitCompassHeading || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      })
    } else {
      setOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      })
    }
  }

  const requestIOSPermission = async () => {
    setMustRequestPermission(false)
    const iOS = typeof requestPermission === 'function'
    if (iOS) {
      requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener(
              'deviceorientation',
              handleOrientation,
              true
            )
          } else {
            console.log('no permission')
          }
        })
        .catch(console.error)
    }
  }

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      const iOS = typeof requestPermission === 'function'
      // iOS 13+
      if (iOS) {
        setMustRequestPermission(true)
      } else {
        if ('ondeviceorientationabsolute' in window) {
          console.log('[ORIENTATION] using absolute')
          window.addEventListener(
            'deviceorientationabsolute' as any,
            handleOrientation,
            true
          )
        } else {
          console.log('[ORIENTATION] using relative')
          window.addEventListener('deviceorientation', handleOrientation, true)
        }
      }
    }
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation)
  }, [requestPermission])

  return { orientation, mustRequestPermission, requestIOSPermission }
}

export default useOrientation
