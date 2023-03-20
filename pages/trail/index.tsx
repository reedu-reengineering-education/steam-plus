import { Spacer } from '@/components/Elements/Spacer'
import Tabs, { Tab } from '@/components/Tabs'
import { TubeMap } from '@/components/TubeMap'
import { getDirectusClient, Line } from '@/lib/directus'
import { GetStaticProps } from 'next'
import { RefObject, useEffect, useRef, useState } from 'react'
import markdownToHtml from '@/lib/markdownToHtml'
import { useRouter } from 'next/router'

import ilipMapData from '@/components/TubeMap/ilip-map.json'

type TrailPageProps = {
  lines: Line[]
}

export const getStaticProps: GetStaticProps = async context => {
  // Query endpint to generate tabs
  const directus = await getDirectusClient()
  const lines = await directus.items('lines').readByQuery()

  var arr = lines.data || []

  // transform lines and convert markdown to html
  const transformedLines: Line[] = await Promise.all(
    arr.map(async (item): Promise<Line> => {
      const markdown = await markdownToHtml(item?.description || '')
      return {
        id: item?.id || 0,
        name: item?.name || '',
        label: item?.label || item?.name || '',
        description: item?.description || '',
        markdown,
      }
    }),
  )

  return {
    props: {
      lines: transformedLines,
    }, // will be passed to the page component as props
    revalidate: 30,
  }
}

const Trail = ({ lines }: TrailPageProps) => {
  const router = useRouter()

  const ref: RefObject<HTMLDivElement> = useRef(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [selectedLine, setSelectedLine] = useState<Line>()
  const [selectedTab, setSelectedTab] = useState<number>(0)

  useEffect(() => {
    if (ref.current != null) {
      setHeight(ref.current.offsetHeight)
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    const line = lines.find(line => line.name === router.query.line)
    let tabIndex = 0
    if (line) {
      tabIndex = lines.indexOf(line)
    }

    setSelectedLine(line)
    setSelectedTab(tabIndex)

    return () => {}
  }, [router.query])

  const tabChanged = (index: number) => {
    const line = lines.find(line => line.id === index + 1)
    setSelectedLine(line)

    router.replace({
      pathname: router.pathname,
      query: {
        line: line?.name,
      },
    })
  }

  return (
    <div className="flex w-full flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">
          TRAIL Map (TRAnsdiciplinary Innovation Lab Map)
        </h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          Start by selecting a line of the TRAIL Map by clicking on one of the
          tabs or the starting line station.
        </p>
        <Spacer size="xs" />
        <Tabs
          tabs={lines as Tab[]}
          onChange={tabChanged}
          selectedTab={selectedTab}
        />
      </div>
      <div className="flex h-1/2 w-full flex-col rounded-md border-4 border-steam-green bg-steam-white p-4 drop-shadow-lg lg:w-2/3">
        <div ref={ref} className="h-192 min-h-full w-full">
          <TubeMap
            height={height}
            width={width}
            selectedLine={selectedLine}
            mapData={ilipMapData}
            zoomEnabled={true}
            initialZoom={0.8}
          />
        </div>
      </div>
    </div>
  )
}

export default Trail
