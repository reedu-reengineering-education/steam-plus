import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: 'starter',
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

const MpiStarters = ({ data }: MpiStarterPageProps) => {
  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">
          Welcome to STEAM+
        </h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          If you want to initiate or further transdisciplinary education in your
          institution/country, it is useful to know about its benefits in order
          to convince relevant stakeholders (e.g. ministries, university
          administrations, funding organizations and, of course, teachers and
          students) of its positive effects as a sustainable learning approach.
          The starters contain a glossary with essential terms related to
          transdisciplinary education, a brief introduction to
          transdisciplinarity and its relevance, as well as quotes from
          students, teachers and fellow policy makers that express the need for
          a turn to transdisciplinary education in European higher education.
        </p>
      </div>
      <div className="flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <div className="flex flex-col p-2 text-center">
          <Link href={`/mpi/starters`}>
            <div className="cursor-pointer hover:underline">
              <Image
                src={require('@/assets/logos/starters.svg')}
                alt="Starters Icon"
              />
              <h2 className="text-steam-green-text-50">Starters</h2>
            </div>
          </Link>
          <hr className="my-4 h-px border-0 bg-steam-green-100" />
          <ul className="p-2 text-left text-sm font-light">
            {data.map(starter => {
              return (
                <li className="m-2" key={starter.id}>
                  <Link href={`/mpi/starters/${starter.slug}`}>
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

export default MpiStarters
