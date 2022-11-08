import { Circle } from '@/components/Elements/Circle'
import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Ilip } from '@/lib/directus'
import Link from 'next/link'

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
  return (
    <div className="flex">
      <div className="w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">
          Innovation Lab Implementation Path
        </h1>
        <Spacer />
        <ul>
          {data.length > 0 &&
            data.map((entry, index) => {
              console.log(entry)
              return (
                <li key={index}>
                  <Link href={`ilip/${entry.slug}`}>
                    <a>{entry.slug}</a>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
      <div className="w-2/3 border-2 ">
        <Circle></Circle>
      </div>
    </div>
  )
}

export default Ilip
