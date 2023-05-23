import { Line } from './line'
import { Station } from './station'

export const getStationNeighbours = (
  station: string,
  line: string,
  stations: Station[],
  lines: Line[],
): { previous: Station; next: Station } => {
  const currentLine = lines.filter(elem => elem.name.toLowerCase() === line)
  const currentStation = stations.filter(elem => elem.nodeName === station)

  const indexOfStation = currentLine[0].stations.indexOf(currentStation[0].name)

  let previousStation: Station[] = []
  let nextStation: Station[] = []

  if (
    indexOfStation != 1 &&
    indexOfStation != currentLine[0].stations.length - 1
  ) {
    const previous = currentLine[0].stations[indexOfStation - 1]
    previousStation = stations.filter(elem => elem.name === previous)
    const next = currentLine[0].stations[indexOfStation + 1]
    nextStation = stations.filter(elem => elem.name === next)
  } else if (indexOfStation == 1) {
  } else {
  }

  return {
    previous: previousStation[0],
    next: nextStation[0],
  }
}
