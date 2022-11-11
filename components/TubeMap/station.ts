import { Line } from './line'

type Position = {
  lat: number
  lon: number
}

enum StationSymbol {
  'single',
  'double',
  'triple',
  'grand',
}

enum LabelPosition {
  'N',
  'NE',
  'S',
  'SW',
  'W',
}

export type Station = {
  id: string
  link: string
  name: string
  label: string
  position: Position
  x: number
  y: number
  labelAngle: number
  labelBold: boolean
  inactive: boolean
  stationSymbol: string
  stationAngle: number
  stationStrokeColor: string
  stationFillColor: string
  lineLabel: boolean
  lineLabelPos: LabelPosition
  lineLabelPath: string
  lineLabelShiftX: number
  lineLabelShiftY: number
  labelPos: LabelPosition
  labelShiftX: number
  labelShiftY: number
  closed: boolean
  visited: boolean
  shiftX: number
  shiftY: number
  coords: number[]
}

type TubeMap = {
  stations: {
    [Key: string]: Station
  }
  lines: Line[]
}

class Stations {
  stations: {
    [Key: string]: Station
  }

  constructor(stations: { [Key: string]: Station }) {
    this.stations = stations
  }

  toArray() {
    const stations = []

    for (const name in this.stations) {
      if (this.stations.hasOwnProperty(name)) {
        const station = this.stations[name]
        station.name = name
        stations.push(station)
      }
    }

    return stations
  }
  labeledStations() {
    const doubles = this.toArray()

    return doubles.filter(function (station) {
      return station.lineLabel === true
    })
  }
  longStations() {
    const doubles = this.toArray()

    return doubles.filter(function (station) {
      return station.stationSymbol !== 'single' && station.stationSymbol
    })
  }
  normalStations() {
    const singles = this.toArray()

    return singles.filter(function (station) {
      return station.stationSymbol === 'single'
    })
  }
}

const extractStations = (data: TubeMap) => {
  data.lines.forEach(function (line: any) {
    for (var node = 0; node < line.nodes.length; node++) {
      var d = line.nodes[node]

      if (!d.hasOwnProperty('name')) continue

      if (!data.stations.hasOwnProperty(d.name))
        throw new Error('Cannot find station with key: ' + d.name)

      var station: Station = data.stations[d.name]

      station.x = d.coords[0]
      station.y = d.coords[1]
      station.labelAngle = d.hasOwnProperty('labelAngle') ? d.labelAngle : 0
      station.labelBold = d.hasOwnProperty('labelBold') ? d.labelBold : false
      station.inactive =
        d.hasOwnProperty('inactive') && d.inactive ? true : false
      station.stationSymbol = d.hasOwnProperty('stationSymbol')
        ? d.stationSymbol
        : 'single'
      station.stationAngle = d.hasOwnProperty('stationAngle')
        ? d.stationAngle
        : 0
      station.stationStrokeColor = d.hasOwnProperty('stationStrokeColor')
        ? d.stationStrokeColor
        : '#000000'
      station.stationFillColor = d.hasOwnProperty('stationFillColor')
        ? d.stationFillColor
        : '#ffffff'

      if (d.lineLabel === true) {
        station.lineLabel = true
        station.lineLabelPos = d.lineLabelPos
        station.lineLabelPath = d.lineLabelPath
        station.lineLabelShiftX = d.lineLabelShiftX || 0
        station.lineLabelShiftY = d.lineLabelShiftY || 0
      } else {
        station.lineLabel = false
      }

      if (station.labelPos === undefined) {
        station.labelPos = d.labelPos
        station.labelShiftX = d.hasOwnProperty('labelShiftCoords')
          ? d.labelShiftCoords[0]
          : d.hasOwnProperty('shiftCoords')
          ? d.shiftCoords[0]
          : line.shiftCoords[0]
        station.labelShiftY = d.hasOwnProperty('labelShiftCoords')
          ? d.labelShiftCoords[1]
          : d.hasOwnProperty('shiftCoords')
          ? d.shiftCoords[1]
          : line.shiftCoords[1]
      }

      station.label = data.stations[d.name].label
      station.position = data.stations[d.name].position
      station.closed = data.stations[d.name].hasOwnProperty('closed')
        ? data.stations[d.name].closed
        : false
      station.visited = false

      if (!d.hide) {
        station.shiftX = d.hasOwnProperty('shiftCoords')
          ? d.shiftCoords[0]
          : line.shiftCoords[0]
        station.shiftY = d.hasOwnProperty('shiftCoords')
          ? d.shiftCoords[1]
          : line.shiftCoords[1]
      }
    }
  })

  return new Stations(data.stations)
}

export default extractStations
