import { Map, Marker } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import APP from '../config/app'
import { Position } from '../types/types'

type MapProps = {
  className?: string
  marker: Position
}

const MapView = (props: MapProps) => {
  const { marker } = props

  return (
    <Map
      initialViewState={{
        longitude: marker.longitude,
        latitude: marker.latitude,
        zoom: 9,
      }}
      style={{ width: '100%', height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={APP.MAP_BOX_ACCESS_TOKEN}
    >
      <Marker longitude={marker.longitude} latitude={marker.latitude}>
        <LocationOnIcon />
      </Marker>
    </Map>
  )
}

export default MapView
