import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient } from '../../../lib/directus'

import mapData from '@/components/TubeMap/ilip-map.json'
import extractStations, { Station } from '@/components/TubeMap/station'
import extractLines, { Line } from '@/components/TubeMap/line'
import markdownToHtml from '@/lib/markdownToHtml'
import PostBody from '@/components/Post/Body'
import { useEffect, useState } from 'react'
import StationNavbar from '@/components/StationNavbar'

interface IParams extends ParsedUrlQuery {
  line: string
  slug: string
}

function transformData(data: any) {
  return {
    raw: data.lines,
    stations: extractStations(data),
    lines: extractLines(data.lines),
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const transformedMapData = transformData(mapData)
  const visibleLines = transformedMapData.lines.lines.filter(
    line => !line.hidden,
  )

  if (visibleLines) {
    let paths: (
      | string
      | {
          params: ParsedUrlQuery
          locale?: string | undefined
        }
    )[] = []
    visibleLines.map(line => {
      line.stations.map(slug => {
        const station = transformedMapData.stations.stations[slug]

        // Skip line label stations
        if (station.lineLabel) {
          return
        }

        paths.push({
          params: {
            line: line.name.toLowerCase(),
            slug: station.name,
          },
        })
      })
    })
    return {
      paths: paths,
      fallback: true,
    }
  } else {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { line, slug } = context.params! as IParams

  const transformedMapData = transformData(mapData)
  const visibleLines = transformedMapData.lines.lines.filter(
    line => !line.hidden,
  )

  const stations = transformedMapData.stations.toArray()

  const currentLine = visibleLines.filter(
    elem => elem.name.toLowerCase() === line,
  )
  const currentStation = stations.filter(elem => elem.name == slug)
  console.log('Current station: ', currentStation)

  const indexOfStation = currentLine[0].stations.indexOf(
    currentStation[0].nodeName,
  )

  let previousStation: Station | null = null
  let nextStation: Station | null = null

  if (
    indexOfStation != 1 &&
    indexOfStation != currentLine[0].stations.length - 1
  ) {
    const previous = currentLine[0].stations[indexOfStation - 1]
    previousStation =
      transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === previous)[0] || null
    const next = currentLine[0].stations[indexOfStation + 1]
    nextStation =
      transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === next)[0] || null
  } else if (indexOfStation == 1) {
    previousStation = null
    const next = currentLine[0].stations[indexOfStation + 1]
    nextStation =
      transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === next)[0] || null
  } else {
    const previous = currentLine[0].stations[indexOfStation - 1]
    previousStation =
      transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === previous)[0] || null
    nextStation = null
  }

  const directus = await getDirectusClient()
  const content = await directus.items('ilip').readByQuery({
    filter: {
      slug: slug,
    },
    fields: ['*', 'author.first_name', 'author.last_name'],
  })
  let markdown = ''
  if (content.data) {
    markdown = await markdownToHtml(content.data[0].content || '')
  }

  return {
    props: {
      line,
      slug,
      station: currentStation[0],
      neighbours: {
        previous: previousStation,
        next: nextStation,
      },
      markdown,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 30, // In seconds
  }
}

type StationPageProps = {
  line: 'teacher' | 'student' | 'policy' | 'educational'
  slug: string
  station: Station
  neighbours: {
    previous: Station
    next: Station
  }
  markdown: string
}

export default function StationPage({
  line,
  slug,
  station,
  neighbours,
  markdown,
}: StationPageProps) {
  console.log('StationPage: ', line, station)
  const router = useRouter()
  const [interchangeableLine, setInterchangableLine] = useState<Line | null>()
  const [interchangeableStation, setInterchangableStation] =
    useState<Station | null>()
  const [interchangeableStationOrder, setInterchangeableStationOrder] =
    useState<string>('next')

  useEffect(() => {
    if (!station) {
      return
    }

    // If changeLine is bigger than 0 there
    // is the possibility to change to a different line
    if (station.changeToLineStation.length > 0) {
      const [interchangeLine, interchangeStation] = station.changeToLineStation
      console.log(interchangeLine, interchangeStation)
      const transformedMapData = transformData(mapData)
      const changeToLine = transformedMapData.lines.lines.filter(
        elem => elem.name === interchangeLine,
      )

      const changeToStation = transformedMapData.stations
        .toArray()
        .filter(
          elem =>
            elem.nodeName.toLowerCase() === interchangeStation.toLowerCase(),
        )

      setInterchangableLine(changeToLine[0])
      setInterchangableStation(changeToStation[0])
      setInterchangeableStationOrder(station.changeToLineOrder)
    }

    return () => {
      setInterchangableLine(null)
      setInterchangableStation(null)
    }
  }, [station])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full flex-col">
      <div className="current-article rounded-3xl border-2 border-steam-green bg-steam-white">
        <div className="m-2 flex flex-col justify-between p-4 text-steam-green-text">
          <StationNavbar
            line={line}
            neighbours={neighbours}
            interchangeableLine={interchangeableLine}
            interchangeableStation={interchangeableStation}
            interchangeableStationOrder={interchangeableStationOrder}
          />
          <div className="flex justify-center">
            <h1 className="w-64 text-center text-4xl font-bold">
              {station.label}
            </h1>
          </div>
        </div>
        <PostBody content={markdown} />
      </div>
    </div>
  )
}
