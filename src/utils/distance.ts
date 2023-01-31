import { Position } from '../types/types'

// calculate distance between two points in km
export const getDistance = (geolocationA: Position, geolocationB: Position) => {
  const R = 6371e3 // metres
  const φ1 = (geolocationA.latitude * Math.PI) / 180 // φ, λ in radians
  const φ2 = (geolocationB.latitude * Math.PI) / 180

  const Δφ = ((geolocationB.latitude - geolocationA.latitude) * Math.PI) / 180
  const Δλ = ((geolocationB.longitude - geolocationA.longitude) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = (R * c) / 1000 // in km

  return d.toFixed(2)
}
