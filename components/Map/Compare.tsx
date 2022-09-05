import { useCallback, useEffect, useRef, useState } from 'react'
import MaplibreCompare from '@maplibre/maplibre-gl-compare'
import '@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css'
import { MapProps, MapRef } from 'react-map-gl'
import Map from '.'

/**
 * Properties of both maps
 */
type CompareProps = {
  orientation?: 'horizontal' | 'vertical'
  beforeMapProps?: MapProps
  afterMapProps?: MapProps
}

/**
 *
 * Compare two maps with a slider
 */
const Compare = ({
  orientation = 'vertical',
  beforeMapProps,
  afterMapProps,
}: CompareProps) => {
  const [compare, setCompare] = useState()
  const containerRef = useRef<HTMLDivElement>(null)

  // use useState and useCallback as an alternative to useRef: https://reactjs.org/docs/hooks-reference.html#useref
  const [beforeMapRef, setBeforeMapRef] = useState<MapRef>()
  const [afterMapRef, setAfterMapRef] = useState<MapRef>()
  const beforeMapCallback = useCallback((beforeMap: MapRef) => {
    setBeforeMapRef(beforeMap)
  }, [])

  const afterMapCallback = useCallback((afterMap: MapRef) => {
    setAfterMapRef(afterMap)
  }, [])

  useEffect(() => {
    if (containerRef.current && beforeMapRef && afterMapRef) {
      // remove compare if exists
      // @ts-ignore
      if (compare) compare.remove()

      const newCompare = new MaplibreCompare(
        beforeMapRef,
        afterMapRef,
        containerRef.current,
        {
          orientation,
        },
      )
      setCompare(newCompare)
    }

    // remove compare on unmount
    return () => {
      // @ts-ignore
      if (compare) compare.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeMapRef, afterMapRef, orientation])

  return (
    <div ref={containerRef} className="relative h-full w-full select-none">
      <Map ref={beforeMapCallback} {...beforeMapProps} />
      <Map ref={afterMapCallback} {...afterMapProps} />
    </div>
  )
}

export default Compare
