import { Spacer } from '@/components/Elements/Spacer'
import Tabs, { lines } from '@/components/Tabs'
import { TubeMap } from '@/components/TubeMap'
import { getDirectusClient, Ilip } from '@/lib/directus'
import Link from 'next/link'
import { RefObject, useEffect, useRef, useState } from 'react'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('ilip').readByQuery()

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}

type IlipPageProps = {
  data: Ilip[]
}

const Ilip = ({ data }: IlipPageProps) => {
  const ref: RefObject<HTMLDivElement> = useRef(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const [selectedLine, setSelectedLine] = useState<string>()

  useEffect(() => {
    if (ref.current != null) {
      setHeight(ref.current.offsetHeight)
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  const tabChanged = (index: number) => {
    console.log('Tab changed to: ', index)
    setSelectedLine(Object.keys(lines)[index])
  }

  return (
    <div className="flex w-full flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">
          Innovation Lab Implementation Path
        </h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          Add some description here how to use the ILIP map.
        </p>
        <Spacer />
        <Tabs onChange={tabChanged} />
      </div>
      <div className="flex w-full flex-col rounded-md border-2 p-4 drop-shadow-lg lg:w-2/3">
        <div ref={ref} className="h-full w-full">
          <TubeMap height={height} width={width} selectedLine={selectedLine} />
        </div>
      </div>
    </div>
  )
}

export default Ilip
