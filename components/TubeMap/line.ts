import { Station } from './station'

export type Line = {
  name: string
  label: string
  title: string
  dashed: boolean
  color: string
  shiftCoords: number[]
  hidden: boolean
  nodes: Station[]
  stations: string[]
  highlighted: boolean
}

function normalizeStationName(stationName: string) {
  return stationName.replace(/[0-9]/g, '').trim()
}

class Lines {
  lines: Line[]

  constructor(lines: Line[]) {
    this.lines = lines
  }

  normalizedLines() {
    const filteredLines = this.lines
      .filter(line => line.dashed == false)
      .map(line => {
        return {
          name: line.name,
          stations: line.stations.map(station => normalizeStationName(station)),
        }
      })

    return filteredLines.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    )
  }
}

const extractLines = (data: any) => {
  const lines: Line[] = []

  data.forEach(function (line: any) {
    const lineObj: Line = {
      name: line.name,
      label: line.label,
      title: line.label,
      dashed: line.hasOwnProperty('dashed') && line.dashed ? true : false,
      stations: [],
      color: line.color,
      shiftCoords: line.shiftCoords,
      nodes: line.nodes,
      highlighted: false,
      hidden: line.hidden,
    }

    lines.push(lineObj)

    for (var node = 0; node < line.nodes.length; node++) {
      var data = line.nodes[node]

      if (!data.hasOwnProperty('name')) continue

      lineObj.stations.push(data.name)
    }
  })

  return new Lines(lines)
}

export default extractLines
