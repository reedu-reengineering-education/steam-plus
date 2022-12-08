import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient } from '../../../lib/directus'

import mapData from '@/components/TubeMap/ilip-map.json'
import extractStations, { Station } from '@/components/TubeMap/station'
import extractLines, { Line } from '@/components/TubeMap/line'
import markdownToHtml from '@/lib/markdownToHtml'
import PostBody from '@/components/Post/Body'
import Link from 'next/link'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Connector } from '@/components/Elements/Connector'
import { BorderY } from '@/components/Elements/BorderY'

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
  const router = useRouter()
  const [interchangeableLine, setInterchangableLine] = useState<Line | null>()
  const [interchangeableStation, setInterchangableStation] =
    useState<Station | null>()
  const [interchangeableStationOrder, setInterchangeableStationOrder] =
    useState<string>('next')

  useEffect(() => {
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
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between">
          {neighbours.previous && (
            <Link href={`/trail/${line}/${neighbours.previous?.name}`} passHref>
              <BorderY variant={line} side="right" className="cursor-pointer">
                <a className="p-4 text-center text-xs">
                  {neighbours.previous.label}
                </a>
              </BorderY>
            </Link>
          )}
          {interchangeableStation &&
            interchangeableStationOrder === 'previous' && (
              <>
                <Link
                  href={`/trail/${interchangeableLine?.name.toLowerCase()}/${
                    interchangeableStation.name
                  }`}
                  passHref
                >
                  <BorderY
                    variant={line}
                    side="right"
                    className="cursor-pointer"
                  >
                    <a className="p-4 text-center text-xs">
                      {interchangeableStation.label}
                    </a>
                  </BorderY>
                </Link>
              </>
            )}
        </div>
        <Connector className="w-1/2" variant={line}></Connector>
        <div className="m-0 p-4 text-center font-bold md:text-base lg:text-lg">
          {station.label}
        </div>
        <Connector className="w-1/2" variant={line}></Connector>
        <div className="flex flex-col justify-between">
          {neighbours.next && (
            <Link href={`/trail/${line}/${neighbours.next?.name}`} passHref>
              <BorderY variant={line} side="left" className="cursor-pointer">
                <a className="p-4 text-center text-xs">
                  {neighbours.next.label}
                </a>
              </BorderY>
            </Link>
          )}
          {interchangeableStation && interchangeableStationOrder === 'next' && (
            <>
              <Link
                href={`/trail/${interchangeableLine?.name.toLowerCase()}/${
                  interchangeableStation.name
                }`}
                passHref
              >
                <BorderY
                  variant={line}
                  side="left"
                  className="cursor-pointer border-dashed"
                >
                  <a className="p-4 text-center text-xs">
                    {interchangeableStation.label}
                  </a>
                </BorderY>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="current-article">
        <PostBody content={markdown} />
      </div>
    </div>
  )
}
