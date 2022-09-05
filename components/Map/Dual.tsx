import { useCallback, useEffect, useState } from 'react'
import syncMaps from '@mapbox/mapbox-gl-sync-move'

import { MapProps, MapRef } from 'react-map-gl'
import Map from '.'
import clsx from 'clsx'

/**
 * Properties of both maps
 */
type DualProps = {
  orientation?: 'horizontal' | 'vertical'
  beforeMapProps?: MapProps
  afterMapProps?: MapProps
}

/**
 *
 * Two maps between each other
 */
const Dual = ({
  orientation = 'vertical',
  beforeMapProps,
  afterMapProps,
}: DualProps) => {
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
    if (beforeMapRef && afterMapRef) {
      syncMaps(beforeMapRef, afterMapRef)
    }
  }, [beforeMapRef, afterMapRef])

  useEffect(() => {
    beforeMapRef?.resize()
    afterMapRef?.resize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation])

  return (
    <div
      className={clsx(
        'flex h-full w-full select-none',
        orientation === 'vertical' ? 'flex-row' : 'flex-col',
      )}
    >
      <div className="relative flex-1">
        <Map ref={beforeMapCallback} {...beforeMapProps} />
      </div>
      <div className="relative flex-1">
        <Map ref={afterMapCallback} {...afterMapProps} />
      </div>
    </div>
  )
}

export default Dual
