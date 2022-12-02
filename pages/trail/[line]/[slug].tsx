import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient } from '../../../lib/directus'

import mapData from '@/components/TubeMap/ilip-map.json'
import extractStations, { Station } from '@/components/TubeMap/station'
import extractLines, { Line } from '@/components/TubeMap/line'
import markdownToHtml from '@/lib/markdownToHtml'
import PostBody from '@/components/Post/Body'
import { getStationNeighbours } from '@/components/TubeMap/utils'
import Link from 'next/link'

interface IParams extends ParsedUrlQuery {
  category: string
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
      line.stations.map(station => {
        paths.push({
          params: {
            line: line.name.toLowerCase(),
            slug: station.toString(),
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

  const neighbours = getStationNeighbours()

  return {
    props: {
      line,
      slug,
      neighbours: {
        p: 'test',
        n: 'test',
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
  neighbours: any
  markdown: string
}

export default function StationPage({
  line,
  slug,
  neighbours,
  markdown,
}: StationPageProps) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link href={`/trail/${line}/${neighbours.p}`} passHref>
        <a>Previous</a>
      </Link>
      <div>
        {line} - {slug}
      </div>
      <Link href={`/trail/${line}/${neighbours.p}`} passHref>
        <a>Next</a>
      </Link>
      <div className="current-article">
        <PostBody content={markdown} />
      </div>
    </div>
  )
}
