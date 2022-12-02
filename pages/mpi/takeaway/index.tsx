import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: 'takeaway',
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
          On the way home
        </h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          Life is about the changes we make. Hereby, the ability to learn is
          crucial. Nevertheless, sometimes it is more important to unlearn.
          Unlearn what we once learned to be the truth. As we live in a
          constantly changing world our system must be able to change quickly.
          Therefore, we must educate next generations to question old solutions
          and come up with creative new ideas. We must enable them to answer
          wicked problems which we cannot foresee. Learning to unlearn also
          means there are no ready-made answers and solutions applicable.
        </p>
        <p className="pt-4 text-base font-light">
          Therefore, we cannot guarantee integration of approaches to your
          individual context or field with the Steam+ Menu for Policy
          Inspiration. But we can give you an overview of best-practice
          examples, research-based insights, and experiences made throughout the
          last 3,5 years.
        </p>
        <p className="pt-4 text-base font-light">
          Throughout the project we have developed, tested, and evaluated
          different strategies to implement a STEAM-based transdisciplinary
          approach within different European countries. However, this Menu will
          not offer you ready made solutions to choose like food in a
          restaurant. We ask you to perceive this Menu as a ‘no food waste’
          menu, changing day by day according to the ingredients available in
          your own country, institution and workplace. We ask you to choose
          daily and staying open for changes and adjustments along your journey,
          but to keep a long-term goal in mind.
        </p>
        <p className="pt-4 text-base font-light">
          Within this Menu you will find starters, main courses, desserts as
          well as beverages of good examples how to implement talent development
          programs using a STEAM-based approach.
        </p>
        <p className="pt-4 text-base font-light">
          We ask you to engage yourself in a co-creative process with your local
          and non-local partners.
        </p>
      </div>
      <div className="flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <div className="flex flex-col p-2 text-center">
          <Link href={`/mpi/takeaway`}>
            <div className="cursor-pointer hover:underline">
              <Image
                src={require('@/assets/logos/starters.svg')}
                alt="Starters Icon"
              />
              <h2 className="text-steam-green-text-50">On the way home</h2>
            </div>
          </Link>
          <hr className="my-4 h-px border-0 bg-steam-green-100" />
          <ul className="p-2 text-left text-sm font-light">
            {data.map(starter => {
              return (
                <li
                  className="m-2 cursor-pointer hover:underline"
                  key={starter.id}
                >
                  <Link href={`/mpi/takeaway/${starter.slug}`}>
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
