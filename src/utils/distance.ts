import { Position } from '../types/types'

// Calculate distance between two points in km
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

// Calculate bearing angle between two points, return value in degrees
export const calculateBearing = (
  startLat: number,
  startLng: number,
  destLat: number,
  destLng: number
) => {
  startLat = toRadians(startLat)
  startLng = toRadians(startLng)
  destLat = toRadians(destLat)
  destLng = toRadians(destLng)

  const y = Math.sin(destLng - startLng) * Math.cos(destLat)
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)
  let brng = Math.atan2(y, x)
  brng = toDegrees(brng)
  return (brng + 360) % 360
}

export const calculateRelativeBearing = (
  startLat: number,
  startLng: number,
  destLat: number,
  destLng: number,
  heading: number
) => {
  const absoluteBearing = calculateBearing(startLat, startLng, destLat, destLng)
  const relativeBearing = (absoluteBearing - heading + 360) % 360
  return relativeBearing
}

// Calculate compass heading from alpha, beta and gamma values
export const calculateCompassHeading = (
  alpha: number,
  beta: number,
  gamma: number
) => {
  // Convert degrees to radians
  const alphaRad = toRadians(alpha)
  const betaRad = toRadians(beta)
  const gammaRad = toRadians(gamma)

  // Calculate equation components
  const cA = Math.cos(alphaRad)
  const sA = Math.sin(alphaRad)
  const sB = Math.sin(betaRad)
  const cG = Math.cos(gammaRad)
  const sG = Math.sin(gammaRad)

  // Calculate A, B, C rotation components
  const rA = -cA * sG - sA * sB * cG
  const rB = -sA * sG + cA * sB * cG

  // Calculate compass heading
  let compassHeading = Math.atan(rA / rB)

  // Convert from half unit circle to whole unit circle
  if (rB < 0) {
    compassHeading += Math.PI
  } else if (rA < 0) {
    compassHeading += 2 * Math.PI
  }

  // Convert radians to degrees
  return toDegrees(compassHeading)
}

// Converts from degrees to radians.
export const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180
}

// Converts from radians to degrees.
export const toDegrees = (radians: number) => {
  return (radians * 180) / Math.PI
}
