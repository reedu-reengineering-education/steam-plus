import { Map as ReactMap, MapProps, MapRef } from 'react-map-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { forwardRef } from 'react'

const Map = forwardRef<MapRef, MapProps>(
  (
    // take fog and terrain out of props to resolve error
    { children, onClick, mapStyle, fog = null, terrain = null, ...props },
    ref,
  ) => {
    return (
      <ReactMap
        ref={ref}
        initialViewState={{
          longitude: 7.62,
          latitude: 51.97,
          zoom: 11,
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        mapStyle={
          mapStyle ||
          `https://api.maptiler.com/maps/basic-gray/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`
        }
        mapLib={maplibregl}
        onClick={onClick}
        {...props}
      >
        {children}
      </ReactMap>
    )
  },
)

Map.displayName = 'Map'

export default Map
