import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery()

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  }
}

type MpiPageProps = {
  data: Mpi[]
}

const Mpi = ({ data }: MpiPageProps) => {
  return (
    <div>
      <Spacer />
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="w-full lg:w-1/3">
          <h1 className="text-xl font-bold text-zinc-600">
            MPI - Menu for Policy Inspiration
          </h1>
          <p className="pt-4 text-base font-light">
            Building on the STEAM+ Innovation Lab approach, Honors Programs,
            Hackathons as well as other experiences accumulated in our partner
            countries, we created a ‘Menu for Policy Inspiration (MPI)’ for
            policy makers to be inspired by these examples and learn more about
            STEAM+ programs in higher education institutes (HEI). With the menu,
            we aim to raise awareness to the relevance of the STEAM+ approach in
            higher education and hope to equip policy makers with theoretical as
            well as practical information on how to support the development of
            transdisciplinary programs in their countries. In order to achieve
            this, we identified good practices in talent development education
            from around Europe and collected key information on these programs.
          </p>
          <p className="pt-4 text-base font-light">
            In addition to presenting good practice examples of existing
            programs, the menu gives theoretical information on
            transdisciplinary education and its benefits, provides valuable
            advice on how to initiate programs in your own country and lists
            possibilities for networking. Thus, it can be understood as a
            guidance or an orientation aid. Input for this menu was collected in
            national meetings with teaching staff, students and local/national
            policy-makers in the individual countries as well as in
            international policy meet-ups at which an exchange of experiences
            across countries took place. Though the menu gives some general
            advice on initiating a program, it cannot be considered a detailed
            instruction on implementation, due to the diverse, complex and
            dynamically developing educational policies in different countries.
            Rather, we hope to win the support of policy makers across Europe to
            take on the challenge and find individual ways to advocate
            transdisciplinary education in their respective countries and to
            become more interconnected.
          </p>
          <p className="pt-4 font-light">
            Enjoy our starters, mains, desserts and beverages!
          </p>
        </div>
        <div className="flex w-full flex-col rounded-md border border-steam-green bg-steam-white p-4 drop-shadow-lg lg:w-2/3">
          <div className="mx-auto text-center text-steam-green-text">
            <h1 className="text-4xl font-black">STEAM+</h1>
            <h3 className="text-xl font-light">MENU FOR POLICY INSPIRATION</h3>
            <hr className="my-2 mx-auto h-1 bg-steam-green" />
            <h6>Served based on local experiences</h6>
            <hr className="my-2 mx-auto h-1 bg-steam-green" />
          </div>
          <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4 pt-8">
            <div className="row-span-2 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
              <div className="flex flex-col p-2 text-center">
                <Link href={`mpi/starters`}>
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
                  {data
                    .filter(entry => entry.category === 'starter')
                    .map(starter => {
                      return (
                        <li className="m-2 hover:underline" key={starter.id}>
                          <Link href={`mpi/starters/${starter.slug}`}>
                            <a>{starter.title}</a>
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
            <div className="row-span-2 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
              <div className="flex flex-col p-2 text-center">
                <Link href={`mpi/main`}>
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
                  {data
                    .filter(entry => entry.category === 'main')
                    .map(starter => {
                      return (
                        <li className="m-2 hover:underline" key={starter.id}>
                          <Link href={`mpi/main/${starter.slug}`}>
                            <a>{starter.title}</a>
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
              <div className="p-2 text-center"></div>
            </div>
            <div className="row-span-2 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
              <div className="flex flex-col p-2 text-center">
                <Link href={`mpi/desserts`}>
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
                  {data
                    .filter(entry => entry.category === 'dessert')
                    .map(starter => {
                      return (
                        <li className="m-2 hover:underline" key={starter.id}>
                          <Link href={`mpi/desserts/${starter.slug}`}>
                            <a>{starter.title}</a>
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </div>
              <div className="p-2 text-center"></div>
            </div>
            <div className="col-span-1 col-start-1 row-start-3 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
              <div className="flex flex-row p-2 text-center">
                <div className="flex flex-col">
                  <Link href={`mpi/beverages`}>
                    <div className="cursor-pointer hover:underline">
                      <Image
                        src={require('@/assets/logos/beverages.svg')}
                        alt="Beverages Icon"
                      />
                      <h2 className="text-steam-green-text-50">Beverages</h2>
                    </div>
                  </Link>
                  <hr className="my-4 h-px border-0 bg-steam-green-100" />
                </div>
                <div>
                  <ul className="p-2 text-left text-sm font-light">
                    {data
                      .filter(entry => entry.category === 'beverage')
                      .map(starter => {
                        return (
                          <li className="m-2 hover:underline" key={starter.id}>
                            <Link href={`mpi/beverages/${starter.slug}`}>
                              <a>{starter.title}</a>
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
              <div className="p-2 text-center"></div>
            </div>
            <div className="col-span-2 col-start-2 row-start-3 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
              <div className="flex flex-row p-2 text-center">
                <div className="flex flex-col">
                  <Link href={`mpi/takeaway`}>
                    <div className="cursor-pointer hover:underline">
                      <Image
                        src={require('@/assets/logos/beverages.svg')}
                        alt="Beverages Icon"
                      />
                      <h2 className="text-steam-green-text-50">
                        On the way home
                      </h2>
                    </div>
                  </Link>
                  <hr className="my-4 h-px border-0 bg-steam-green-100" />
                </div>
                <div>
                  <ul className="p-2 text-left text-sm font-light">
                    {data
                      .filter(entry => entry.category === 'takeaway')
                      .map(starter => {
                        return (
                          <li className="m-2 hover:underline" key={starter.id}>
                            <Link href={`mpi/takeaway/${starter.slug}`}>
                              <a>{starter.title}</a>
                            </Link>
                          </li>
                        )
                      })}
                  </ul>
                </div>
              </div>
              <div className="p-2 text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mpi
