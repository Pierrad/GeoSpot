export type Position = {
  latitude: number
  longitude: number
}

export type PositionError = {
  code: number
  message: string
}

export type Spot = {
  id: string
  name: string
  image: string
  geolocation: Position
  created_at: string
  updated_at: string
}

export type DiscoveredSpot = {
  id_place: string
  id_user: string
  date: string
  place: Spot
}
