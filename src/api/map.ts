import APP from '../config/app'
import { Position } from '../types/types'

export const getRouteToDestination = async (
  currentPosition: Position,
  destinationPosition: Position
) => {
  const currLat = currentPosition.latitude
  const currLng = currentPosition.longitude
  const destLat = destinationPosition.latitude
  const destLng = destinationPosition.longitude
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${currLng}%2C${currLat}%3B${destLng}%2C${destLat}?alternatives=false&geometries=geojson&language=fr&overview=full&steps=true&access_token=${APP.MAP_BOX_ACCESS_TOKEN}`
  )

  const data = await response.json()

  const { routes } = data

  const geometry = routes[0].geometry

  return {
    type: 'Feature',
    properties: {},
    geometry,
  }
}
