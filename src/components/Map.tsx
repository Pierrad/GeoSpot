import { Layer, Map, Marker, Source } from 'react-map-gl'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import APP from '../config/app'
import { Position } from '../types/types'
import { QueryKey } from '../config/keys'
import { useQuery } from 'react-query'
import { getRouteToDestination } from '../api/map'

type MapProps = {
  className?: string
  marker: Position
  position?: Position
}

const MapView = (props: MapProps) => {
  const { marker, position } = props

  const { data: geojson } = useQuery(QueryKey.GET_ROUTE_TO_DESTINATION, () => {
    if (!position) return
    return getRouteToDestination(position, marker)
  })

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
        {geojson && (
          <Source type="geojson" data={geojson as any}>
            <Layer
              id="lineLayer"
              type="line"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': 'rgba(255, 0, 247, 0.5)',
                'line-width': 5,
              }}
            />
          </Source>
        )}
        <LocationOnIcon />
      </Marker>
    </Map>
  )
}

export default MapView
