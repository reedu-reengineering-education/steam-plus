import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient } from '../../../lib/directus'

import mapData from '@/components/TubeMap/ilip-map.json'
import extractStations, { Station } from '@/components/TubeMap/station'
import extractLines, { Line } from '@/components/TubeMap/line'
import markdownToHtml from '@/lib/markdownToHtml'
import PostBody from '@/components/Post/Body'
import Link from 'next/link'

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
  if (currentLine[0].name !== 'STUDENT' && currentLine[0].name !== 'POLICY') {
    if (
      indexOfStation != 1 &&
      indexOfStation != currentLine[0].stations.length - 1
    ) {
      const previous = currentLine[0].stations[indexOfStation - 1]
      previousStation = transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === previous)[0]
      const next = currentLine[0].stations[indexOfStation + 1]
      nextStation = transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === next)[0]
    } else if (indexOfStation == 1) {
      previousStation = null
      const next = currentLine[0].stations[indexOfStation + 1]
      nextStation = transformedMapData.stations
        .toArray()
        .filter(elem => elem.nodeName === next)[0]
    } else {
      previousStation = null
      nextStation = null
    }
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
  line: string
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

  const colorClass = `border-trail-${line}`

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        {neighbours.previous && (
          <Link href={`/trail/${line}/${neighbours.previous?.name}`} passHref>
            <a className="p-4 text-center text-sm">
              {neighbours.previous.label}
            </a>
          </Link>
        )}
        <div className={`w-1/2 border-2 ${colorClass}`}></div>
        <div className="m-0 p-4 text-center text-lg font-bold">
          {station.label}
        </div>
        <div className={`w-1/2 border-2 ${colorClass}`}></div>
        {neighbours.next && (
          <Link href={`/trail/${line}/${neighbours.next?.name}`} passHref>
            <a className="p-4 text-center text-sm">{neighbours.next.name}</a>
          </Link>
        )}
      </div>
      <div className="current-article">
        <PostBody content={markdown} />
      </div>
    </div>
  )
}
