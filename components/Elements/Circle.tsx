import React, { RefObject, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ilipMapData from '../TubeMap/ilip-map.json'

export const Circle = () => {
  const ref: RefObject<HTMLDivElement> = useRef(null)

  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    const size = 500
    const svg = d3
      .select(ref.current)
      .datum(ilipMapData)
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('circle')
      .attr('transform', 'translate(150, 150)')
      .attr('r', 100)
      .attr('class', 'circle')
      .on('click', () => {
        // eslint-disable-next-line no-alert
        alert('onClick')
      })
      .on('mouseover', event => {
        // eslint-disable-next-line no-alert
      })
      .on('mouseout', event => {
        // eslint-disable-next-line no-alert
      })
  }

  return <div className="tube-map" ref={ref}></div>
}
