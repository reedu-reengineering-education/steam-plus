// @ts-nocheck

import React, { RefObject, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import ilipMapData from './ilip-map.json'
import extractStations, { Station } from './station'
import extractLines, { Line } from './line'

function transformData(data: any) {
  return {
    raw: data.lines,
    stations: extractStations(data),
    lines: extractLines(data.lines),
  }
}

const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const xScale = d3.scaleLinear()
const yScale = d3.scaleLinear()
const lineWidthMultiplier = 0.7
const lineWidthTickRatio = 1

type TubeMapProps = {
  selectedLine?: string
  height: number
  width: number
}

export const TubeMap = ({ selectedLine, height, width }: TubeMapProps) => {
  const ref: RefObject<HTMLDivElement> = useRef(null)
  const [data] = useState(transformData(ilipMapData))
  const [lineWidth, setLineWidth] = useState<number>(0)

  useEffect(() => {
    // Just initialize if height and width are set
    if (height === 0 || width === 0) {
      return
    }

    const minX =
      d3.min(data.raw, (line: Line) => {
        return d3.min(line.nodes, node => {
          return node.coords[0]
        })
      }) - 1

    const maxX =
      d3.max(data.raw, function (line: Line) {
        return d3.max(line.nodes, function (node) {
          return node.coords[0]
        })
      }) + 1

    const minY =
      d3.min(data.raw, function (line: Line) {
        return d3.min(line.nodes, function (node) {
          return node.coords[1]
        })
      }) - 1

    const maxY =
      d3.max(data.raw, function (line: Line) {
        return d3.max(line.nodes, function (node) {
          return node.coords[1]
        })
      }) + 1

    const desiredAspectRatio = (maxX - minX) / (maxY - minY)
    const actualAspectRatio =
      (width - margin.left - margin.right) /
      (height - margin.top - margin.bottom)

    const ratioRatio = actualAspectRatio / desiredAspectRatio
    let maxXRange
    let maxYRange

    // Note that we flip the sense of the y-axis here
    if (desiredAspectRatio > actualAspectRatio) {
      maxXRange = width - margin.left - margin.right
      maxYRange = (height - margin.top - margin.bottom) * ratioRatio
    } else {
      maxXRange = (width - margin.left - margin.right) / ratioRatio
      maxYRange = height - margin.top - margin.bottom
    }

    xScale.domain([minX, maxX]).range([margin.left, margin.left + maxXRange])
    yScale.domain([minY, maxY]).range([margin.top + maxYRange, margin.top])

    const unitLength = Math.abs(
      xScale(1) - xScale(0) !== 0
        ? xScale(1) - xScale(0)
        : yScale(1) - yScale(0),
    )

    const lineWidth = lineWidthMultiplier * unitLength
    setLineWidth(lineWidth)

    const svg = d3
      .select(ref.current)
      .append('svg')
      .style('width', '100%')
      .style('height', `${height}px`)

    const gMap = svg.append('g')

    init()
    drawLines(lineWidth)
    // drawLineLabels()
    drawStations(lineWidth)
    drawLongStations(lineWidth)
    drawLabels(lineWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width])

  useEffect(() => {
    console.info('Update selected and highlighted line: ', selectedLine)

    if (selectedLine && selectedLine !== '') {
      // Filter stations
      const line = data.lines.lines.filter(
        line => line.name === selectedLine.toUpperCase(),
      )
      console.log('Selected line: ', line)

      // Reset all lines and stations to default
      // if user selects All
      if (selectedLine.toLocaleLowerCase() === 'all') {
        d3.selectAll('.line').each(function (this, d: Line) {
          if (!d.hidden) {
            d3.select(this).attr('highlighted', 'false').attr('stroke', d.color)
          }
        })
        d3.selectAll('.station').each(function (this, d: Station) {
          const stop = trainStop(lineWidth, false)
          d3.select(this).attr('d', stop)
        })
      } else {
        // Highlight selected line or better fade out not selected lines
        d3.selectAll('.line').each(function (this, d: Line) {
          if (d.name.toLowerCase() !== selectedLine.toLocaleLowerCase()) {
            d3.select(this)
              .attr('highlighted', 'true')
              .attr('stroke', '#F6F5F5')
          } else {
            if (!d.hidden) {
              d3.select(this)
                .attr('highlighted', 'false')
                .attr('stroke', d.color)
            }
          }
        })

        // TODO: Highlight or fade out stations and labels of non selected lines

        // Reset all stations to default size
        d3.selectAll('.station').each(function (this, d: Station) {
          d3.select(this).attr('d', trainStop(lineWidth))
        })

        // Highlight stations of selected Line
        line[0].nodes.forEach(node => {
          if (node.name) {
            const highlightedTrainStop = trainStop(lineWidth, true)
            d3.select(`.station.${classFromName(node.name)}`).attr(
              'd',
              highlightedTrainStop,
            )
          }
        })
      }
    }

    return () => {}
  }, [selectedLine])

  function zoomed(event) {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .attr('transform', event.transform.toString())
  }

  const init = () => {
    d3.select(ref.current)
      .select('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .datum(ilipMapData)

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 10])
      .on('zoom', zoomed)

    const zoomContainer = d3
      .select(ref.current)
      .select('svg')
      .call(zoomBehavior)

    const initialScale = 0.6
    const initialTranslate = [-(width / 3), -(height / 4)]

    zoomBehavior.scaleTo(zoomContainer, initialScale)
    zoomBehavior.translateTo(
      zoomContainer,
      initialTranslate[0],
      initialTranslate[1],
    )
  }

  function trainStop(lineWidth: number, highlighted) {
    if (highlighted) {
      return d3
        .arc()
        .innerRadius(0)
        .outerRadius(1.37 * 1.67 * lineWidth)
        .startAngle(0)
        .endAngle(2 * Math.PI)
    }

    return d3
      .arc()
      .innerRadius(0)
      .outerRadius(1.37 * lineWidth)
      .startAngle(0)
      .endAngle(2 * Math.PI)
  }

  function toggleHighlight(d: Station, lineWidth) {
    const station = d3.selectAll('.station.'.concat(classFromName(d.name)))
    const label = d3.selectAll('.label.'.concat(classFromName(d.name)))

    if (station.attr('highlighted') === 'true') {
      station
        .attr('highlighted', 'false')
        .attr(
          'fill',
          station.attr('current') === 'true' ? 'yellow' : d.stationFillColor,
        )
        .attr('stroke-width', lineWidth / 4)
      label.attr('highlighted', 'false').style('text-decoration', 'none')
    } else {
      station.attr('highlighted', 'true').attr('stroke-width', lineWidth / 2)
      label.attr('highlighted', 'false').style('text-decoration', 'underline')
    }
  }

  function line(
    data,
    xScale,
    yScale,
    lineWidth: number,
    lineWidthTickRatio: number,
  ) {
    var path = ''

    var lineNodes = data.nodes

    var unitLength = Math.abs(
      xScale(1) - xScale(0) !== 0
        ? xScale(1) - xScale(0)
        : yScale(1) - yScale(0),
    )
    var sqrt2 = Math.sqrt(2)

    var shiftCoords = [
      (data.shiftCoords[0] * lineWidth) / unitLength,
      (data.shiftCoords[1] * lineWidth) / unitLength,
    ]

    var lastSectionType = 'diagonal' // TODO: HACK

    var nextNode, currNode, xDiff, yDiff
    var points

    for (var lineNode = 0; lineNode < lineNodes.length; lineNode++) {
      if (lineNode > 0) {
        nextNode = lineNodes[lineNode]
        currNode = lineNodes[lineNode - 1]

        var direction = ''

        xDiff = Math.round(currNode.coords[0] - nextNode.coords[0])
        yDiff = Math.round(currNode.coords[1] - nextNode.coords[1])

        var lineEndCorrection = [0, 0]

        if (lineNode === lineNodes.length - 1) {
          if (xDiff == 0 || yDiff == 0) {
            if (xDiff > 0)
              lineEndCorrection = [
                -lineWidth / (2 * lineWidthTickRatio * unitLength),
                0,
              ]
            if (xDiff < 0)
              lineEndCorrection = [
                lineWidth / (2 * lineWidthTickRatio * unitLength),
                0,
              ]
            if (yDiff > 0)
              lineEndCorrection = [
                0,
                -lineWidth / (2 * lineWidthTickRatio * unitLength),
              ]
            if (yDiff < 0)
              lineEndCorrection = [
                0,
                lineWidth / (2 * lineWidthTickRatio * unitLength),
              ]
          } else {
            if (xDiff > 0 && yDiff > 0)
              lineEndCorrection = [
                -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
                -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              ]
            if (xDiff > 0 && yDiff < 0)
              lineEndCorrection = [
                -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
                lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              ]
            if (xDiff < 0 && yDiff > 0)
              lineEndCorrection = [
                lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
                -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              ]
            if (xDiff < 0 && yDiff < 0)
              lineEndCorrection = [
                lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
                lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              ]
          }
        }

        points = [
          [
            xScale(currNode.coords[0] + shiftCoords[0]),
            yScale(currNode.coords[1] + shiftCoords[1]),
          ],
          [
            xScale(nextNode.coords[0] + shiftCoords[0] + lineEndCorrection[0]),
            yScale(nextNode.coords[1] + shiftCoords[1] + lineEndCorrection[1]),
          ],
        ]

        if (xDiff == 0 || yDiff == 0) {
          lastSectionType = 'udlr'
          path += 'L' + points[1][0] + ',' + points[1][1]
        } else if (Math.abs(xDiff) == Math.abs(yDiff) && Math.abs(xDiff) > 1) {
          lastSectionType = 'diagonal'
          path += 'L' + points[1][0] + ',' + points[1][1]
        } else if (Math.abs(xDiff) == 1 && Math.abs(yDiff) == 1) {
          direction = nextNode.dir.toLowerCase()

          switch (direction) {
            case 'e':
              path +=
                'Q' +
                points[1][0] +
                ',' +
                points[0][1] +
                ',' +
                points[1][0] +
                ',' +
                points[1][1]
              break
            case 's':
              path +=
                'Q' +
                points[0][0] +
                ',' +
                points[1][1] +
                ',' +
                points[1][0] +
                ',' +
                points[1][1]
              break
            case 'n':
              path +=
                'Q' +
                points[0][0] +
                ',' +
                points[1][1] +
                ',' +
                points[1][0] +
                ',' +
                points[1][1]
              break
            case 'w':
              path +=
                'Q' +
                points[1][0] +
                ',' +
                points[0][1] +
                ',' +
                points[1][0] +
                ',' +
                points[1][1]
              break
          }
        } else if (
          (Math.abs(xDiff) == 1 && Math.abs(yDiff) == 2) ||
          (Math.abs(xDiff) == 2 && Math.abs(yDiff) == 1)
        ) {
          var controlPoints
          if (xDiff == 1) {
            if (lastSectionType == 'udlr') {
              controlPoints = [
                points[0][0],
                points[0][1] + (points[1][1] - points[0][1]) / 2,
              ]
            } else if (lastSectionType == 'diagonal') {
              controlPoints = [
                points[1][0],
                points[0][1] + (points[1][1] - points[0][1]) / 2,
              ]
            }
          } else if (xDiff == -1) {
            if (lastSectionType == 'udlr') {
              controlPoints = [
                points[0][0],
                points[0][1] + (points[1][1] - points[0][1]) / 2,
              ]
            } else if (lastSectionType == 'diagonal') {
              controlPoints = [
                points[1][0],
                points[0][1] + (points[1][1] - points[0][1]) / 2,
              ]
            }
          } else if (xDiff == -2) {
            if (lastSectionType == 'udlr') {
              controlPoints = [
                points[0][0] + (points[1][0] - points[0][0]) / 2,
                points[0][1],
              ]
            } else if (lastSectionType == 'diagonal') {
              controlPoints = [
                points[0][0] + (points[1][0] - points[0][0]) / 2,
                points[1][1],
              ]
            }
          } else if (xDiff == 2) {
            if (lastSectionType == 'udlr') {
              controlPoints = [
                points[0][0] + (points[1][0] - points[0][0]) / 2,
                points[0][1],
              ]
            } else if (lastSectionType == 'diagonal') {
              controlPoints = [
                points[0][0] + (points[1][0] - points[0][0]) / 2,
                points[1][1],
              ]
            }
          }

          path +=
            'C' +
            controlPoints[0] +
            ',' +
            controlPoints[1] +
            ',' +
            controlPoints[0] +
            ',' +
            controlPoints[1] +
            ',' +
            points[1][0] +
            ',' +
            points[1][1]
        }
      } else {
        nextNode = lineNodes[lineNode + 1]
        currNode = lineNodes[lineNode]

        xDiff = Math.round(currNode.coords[0] - nextNode.coords[0])
        yDiff = Math.round(currNode.coords[1] - nextNode.coords[1])

        var lineStartCorrection = [0, 0]

        if (xDiff == 0 || yDiff == 0) {
          if (xDiff > 0)
            lineStartCorrection = [
              lineWidth / (2 * lineWidthTickRatio * unitLength),
              0,
            ]
          if (xDiff < 0)
            lineStartCorrection = [
              -lineWidth / (2 * lineWidthTickRatio * unitLength),
              0,
            ]
          if (yDiff > 0)
            lineStartCorrection = [
              0,
              lineWidth / (2 * lineWidthTickRatio * unitLength),
            ]
          if (yDiff < 0)
            lineStartCorrection = [
              0,
              -lineWidth / (2 * lineWidthTickRatio * unitLength),
            ]
        } else {
          if (xDiff > 0 && yDiff > 0)
            lineStartCorrection = [
              lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
            ]
          if (xDiff > 0 && yDiff < 0)
            lineStartCorrection = [
              lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
            ]
          if (xDiff < 0 && yDiff > 0)
            lineStartCorrection = [
              -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
            ]
          if (xDiff < 0 && yDiff < 0)
            lineStartCorrection = [
              -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
              -lineWidth / (2 * lineWidthTickRatio * unitLength * sqrt2),
            ]
        }

        points = [
          xScale(currNode.coords[0] + shiftCoords[0] + lineStartCorrection[0]),
          yScale(currNode.coords[1] + shiftCoords[1] + lineStartCorrection[1]),
        ]

        path += 'M' + points[0] + ',' + points[1]
      }
    }

    return path
  }

  const drawLineLabels = () => {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .selectAll('image')
      .data(data.stations.labeledStations())
      .enter()
      .append('g')
      .attr('id', function (d) {
        return d.name
      })
      .append('image')
      .attr('xlink:href', function (d) {
        return d.lineLabelPath
      })
      .attr('width', lineWidth * 5.2)
      .attr('height', lineWidth * 5.2)
      .attr('dy', 0)
    // .attr('x', function(d) {
    //   return xScale(d.x + d.lineLabelShiftX) + lineLabelPos(d).pos[0];
    // })
    // .attr('y', function(d) {
    //   return yScale(d.y + d.lineLabelShiftY) - lineLabelPos(d).pos[1];
    // })
  }

  function textPos(data, lineWidth: number) {
    return itemPos(data, lineWidth, 'labelPos')
  }

  function lineLabelPos(data) {
    return itemPos(data, 'lineLabelPos')
  }

  function itemPos(data, lineWidth: number, item) {
    var pos
    var textAnchor
    var alignmentBaseline
    var offset = lineWidth * 1.8

    var numLines = data.label.split(/\n/).length

    var sqrt2 = Math.sqrt(2)

    switch (data[item].toLowerCase()) {
      case 'n':
        pos = [0, 2.1 * lineWidth * (numLines - 0.5) + offset]
        textAnchor = 'middle'
        alignmentBaseline = 'baseline'
        break
      case 'ne':
        pos = [offset / sqrt2, (lineWidth * (numLines - 1) + offset) / sqrt2]
        textAnchor = 'start'
        alignmentBaseline = 'baseline'
        break
      case 'e':
        pos = [offset, -2]
        textAnchor = 'start'
        alignmentBaseline = 'baseline'
        break
      case 'se':
        pos = [offset / sqrt2, -offset / sqrt2]
        textAnchor = 'start'
        alignmentBaseline = 'hanging'
        break
      case 's':
        pos = [0, -lineWidthMultiplier * offset]
        textAnchor = 'middle'
        alignmentBaseline = 'hanging'
        break
      case 'sw':
        pos = [-offset / sqrt2, -offset / sqrt2]
        textAnchor = 'end'
        alignmentBaseline = 'hanging'
        break
      case 'w':
        pos = [-offset, -2]
        textAnchor = 'end'
        alignmentBaseline = 'baseline'
        break
      case 'nw':
        pos = [
          -(lineWidth * (numLines - 1) + offset) / sqrt2,
          (lineWidth * (numLines - 1) + offset) / sqrt2,
        ]
        textAnchor = 'end'
        alignmentBaseline = 'baseline'
        break
    }

    return {
      pos: pos,
      textAnchor: textAnchor,
      alignmentBaseline: alignmentBaseline,
    }
  }

  function classFromName(currentName: string) {
    return currentName.replace(/[()0-9 ]/g, '').toLowerCase()
  }

  function drawLabels(lineWidth: number) {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .append('g')
      .selectAll('text')
      .data(data.stations.toArray())
      .enter()
      .append('g')
      .attr('id', function (d) {
        return d.name
      })
      .classed('label', true)
      .append('text')
      .text(function (d) {
        return d.label
      })
      .attr('fill', function (d) {
        return d.inactive ? 'grey' : 'black'
      })
      .style('font-size', 3 * lineWidth + 'px')
      .style('font-weight', function (d) {
        return d.labelBold ? '700' : '400'
      })
      .attr('dy', 0)
      .attr('x', function (d) {
        return xScale(d.x + d.labelShiftX) + textPos(d, lineWidth).pos[0]
      })
      .attr('y', function (d) {
        return yScale(d.y + d.labelShiftY) - textPos(d, lineWidth).pos[1]
      })
      .attr('text-anchor', function (d) {
        return textPos(d).textAnchor
      })
      .attr('transform', function (d) {
        var _x = xScale(d.x + d.labelShiftX) + textPos(d, lineWidth).pos[0]
        var _y = yScale(d.y + d.labelShiftY) - textPos(d, lineWidth).pos[1]
        return 'rotate(' + d.labelAngle + ',' + _x + ',' + _y + ')'
      })
      .attr('class', function (d) {
        var boldLabel = d.labelBold ? 'bold-label' : ''
        return 'label ' + boldLabel + ' ' + classFromName(d.name)
      })
      .style('display', function (d) {
        return d.hide !== true ? 'block' : 'none'
      })
      .style('text-decoration', function (d) {
        return d.closed ? 'line-through' : 'none'
      })
      .style('-webkit-user-select', 'none')
      .classed('highlighted', function (d) {
        return d.visited
      })
    // .call(wrap, function(d) {
    //   return textPos(d).alignmentBaseline;
    // })
  }

  const drawLines = (lineWidth: number) => {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .append('g')
      .attr('class', 'lines')
      .selectAll('path')
      .data(data.lines.lines)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return line(d, xScale, yScale, lineWidth, lineWidthTickRatio)
      })
      .attr('id', function (d) {
        return d.name
      })
      .attr('stroke', function (d) {
        return d.color
      })
      .attr('fill', 'none')
      .attr('stroke-width', function (d) {
        if (d.hidden) {
          return 0
        }
        return lineWidth * 1.4
      })
      .style('stroke-linecap', 'round')
      .style('stroke-linejoin', 'round')
      .style('stroke-dasharray', function (d) {
        var spaces = lineWidth * 2.7
        var dashed_values = d.dashed ? spaces + lineWidth : (0, 0)
        return dashed_values
      })
      // .classed('line', true)
      .attr('class', function (d) {
        return `line ${d.name.toLowerCase()}`
      })
  }

  const drawStations = (lineWidth: number) => {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .append('g')
      .selectAll('path')
      .data(data.stations.normalStations())
      .enter()
      .append('g')
      .attr('id', function (d) {
        return d.name
      })
      .attr('data-link', function (d) {
        return d.link
      })
      .on('click', function (d) {
        const newWindow = window.open(
          d.target.__data__.link,
          '_blank',
          'noopener,noreferrer',
        )
        if (newWindow) newWindow.opener = null
      })
      .append('path')
      .attr('d', trainStop(lineWidth))
      .attr('transform', function (d) {
        return (
          'translate(' +
          xScale(d.x + d.shiftX * lineWidthMultiplier) +
          ',' +
          yScale(d.y + d.shiftY * lineWidthMultiplier) +
          ')'
        )
      })
      .attr('stroke-width', lineWidth / 4)
      .attr('fill', function (d) {
        return d.stationFillColor
      })
      .attr('stroke', function (d) {
        return d.stationStrokeColor
      })
      .on('mouseover', function (_, d) {
        toggleHighlight(d, lineWidth)
      })
      .on('mouseout', function (_, d) {
        toggleHighlight(d, lineWidth)
      })
      .attr('class', function (d) {
        return 'station ' + classFromName(d.name)
      })
      .style('cursor', 'pointer')
  }

  const drawLongStations = (lineWidth: number) => {
    d3.select(ref.current)
      .select('svg')
      .select('g')
      .append('g')
      .selectAll('path')
      .data(data.stations.longStations())
      .enter()
      .append('g')
      .append('rect')
      .attr('rx', lineWidth)
      .attr('ry', lineWidth)
      .attr('width', function (d) {
        if (d.stationSymbol === 'grand') {
          return lineWidth * 6.4
        }
        return lineWidth * 4.4
      })
      .attr('height', function (d) {
        var multiplier = 5
        switch (d.stationSymbol) {
          case 'triple':
            multiplier = 10
            break
          case 'grand':
            multiplier = 14
          default:
            break
        }

        return lineWidth * multiplier
      })
      .attr('stroke-width', lineWidth / 4)
      .attr('id', function (d) {
        return d.name
      })
      .attr('data-link', function (d) {
        return d.link
      })
      .attr('transform', function (d) {
        var offset = 0.8

        return (
          'translate(' +
          xScale(d.x + d.shiftX * lineWidthMultiplier - offset) +
          ',' +
          yScale(d.y + d.shiftY * lineWidthMultiplier + offset) +
          ')' +
          'rotate(' +
          d.stationAngle +
          ')'
        )
      })
      .attr('fill', function (d) {
        return d.stationFillColor
      })
      // .on("click", function (d) {
      //   listeners.call("click", this, d);
      // })
      .on('mouseover', function (_, d) {
        toggleHighlight(d, lineWidth)
      })
      .on('mouseout', function (_, d) {
        toggleHighlight(d, lineWidth)
      })
      .attr('stroke', function (d) {
        return d.stationStrokeColor
      })
      .attr('class', function (d) {
        return 'station ' + classFromName(d.name)
      })
      .style('cursor', 'pointer')
  }

  return <div className="tube-map" ref={ref}></div>
}
