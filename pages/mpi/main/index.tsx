import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: 'main',
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

const MpiMainMeals = ({ data }: MpiStarterPageProps) => {
  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">Main Courses</h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          Once you have consumed our starters and have gained a first
          understanding of transdisciplinary education, you can now enjoy the
          main courses which will provide you with more practical information.
          Our main courses and side dishes show different good practice examples
          on STEAM-based projects that are focusing on talent development in
          higher educational institutions throughout Europe.
        </p>
        <p className="pt-4 text-base font-light">
          In the section “Our Recommendations”, you find information on the
          three STEAM+ Innovation Labs in Venice, Klaipeda and Linz that took
          place as part of the project from July 2020 to May 2022. The labs,
          designed for students and teachers of different disciplines and from
          all 9 participating countries, to come together and work on a mutual
          topic in small teams, can be regarded as laboratories for exploring
          co-creational, transdisciplinary collaboration. Our findings on the
          benefits and challenges of each lab will be presented here.
        </p>
        <p className="pt-4 text-base font-light">
          If you want to learn more about the format of Innovation Labs and how
          to implement them, we also recommend to have a look at the Innovation
          Lab Implementation Path (ILIP). With the ILIP we have created a
          roadmap which helps you find the best way to plan and conduct your own
          innovation lab. To start the journey, click{' '}
          <Link href={`/ilip`}>here</Link>
        </p>
        <p className="pt-4 text-base font-light">
          In the section “Side Dishes”, we broaden the view and provide examples
          of additional formats of TDE, such as transdisciplinary degree
          programs, Honors programs or extracurricular activities.
        </p>
      </div>
      <div className="flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <div className="flex flex-col p-2 text-center">
          <Link href={`/mpi/main`}>
            <div className="cursor-pointer hover:underline">
              <Image
                src={require('@/assets/logos/main-meals.svg')}
                alt="Main meals Icon"
              />
              <h2 className="text-steam-green-text-50">Main meals</h2>
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
                  <Link href={`/mpi/main/${starter.slug}`}>
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

export default MpiMainMeals
