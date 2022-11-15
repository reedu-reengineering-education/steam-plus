import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: 'dessert',
    },
  })

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}

type MpiStarterPageProps = {
  data: Mpi[]
}

const MpiDesserts = ({ data }: MpiStarterPageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">Desserts</h1>
        <Spacer />
      </div>
      <div className="flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <div className="flex flex-col p-2 text-center">
          <Link href={`/mpi/desserts`}>
            <div className="cursor-pointer hover:underline">
              <Image
                src={require('@/assets/logos/desserts.svg')}
                alt="Desserts Icon"
              />
              <h2 className="text-steam-green-text-50">Desserts</h2>
            </div>
          </Link>
          <hr className="my-4 h-px border-0 bg-steam-green-100" />
          <ul className="p-2 text-left text-sm font-light">
            {data.map(starter => {
              return (
                <li className="m-2" key={starter.id}>
                  <Link href={`/mpi/desserts/${starter.slug}`}>
                    <a>{starter.title}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MpiDesserts
