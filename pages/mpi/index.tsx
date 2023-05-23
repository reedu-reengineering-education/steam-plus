import Markdown from '@/components/Post/Markdown'
import { getDirectusClient, Mpi, Output } from '@/lib/directus'
import markdownToHtml from '@/lib/markdownToHtml'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const output = await directus.items('output').readOne('mpi')
  const { data } = await directus.items('mpi').readByQuery({
    sort: ['order'],
  })

  let description = ''
  if (output) {
    description = await markdownToHtml(output.description || '')
  }

  return {
    props: {
      output,
      description,
      data,
    }, // will be passed to the page component as props
  }
}

type MpiPageProps = {
  output: Output
  description: string
  data: Mpi[]
}

const Mpi = ({ output, description, data }: MpiPageProps) => {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-bold text-zinc-600">
          {output.output.toUpperCase()} - {output.title}
        </h1>
        <div className="text-base font-light">
          <Markdown content={description} />
        </div>
      </div>
      <div className="flex h-1/2 w-full flex-col rounded-md border border-steam-green bg-steam-white p-12 drop-shadow-lg lg:w-2/3">
        <div className="mx-auto text-center text-steam-green-text">
          <h1 className="text-4xl font-black">STEAM+</h1>
          <h3 className="text-xl font-light uppercase">{output.title}</h3>
          <hr className="my-2 mx-auto h-1 bg-steam-green" />
          <h6>Served based on local experiences</h6>
          <hr className="my-2 mx-auto h-1 bg-steam-green" />
        </div>
        <div className="grid grid-flow-col grid-cols-1 grid-rows-5 gap-4 pt-8 lg:grid-cols-3 lg:grid-rows-2">
          <div className="order-1 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg lg:order-none lg:row-span-2">
            <div className="flex h-full flex-col p-2 text-center">
              <Link href={`mpi/starter`}>
                <div className="cursor-pointer hover:underline">
                  <Image
                    src={require('@/assets/logos/starter.svg')}
                    alt="Starters Icon"
                  />
                  <h2 className="text-lg font-bold text-steam-green-text-50">
                    Starters
                  </h2>
                </div>
              </Link>
              <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
              <ul className="p-2 text-center text-base font-light">
                {data
                  .filter(entry => entry.category === 'starter')
                  .map(starter => {
                    return (
                      <li className="m-2 hover:underline" key={starter.id}>
                        <Link href={`mpi/starter/${starter.slug}`}>
                          <a>{starter.title}</a>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          <div className="order-3 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg lg:order-none lg:row-span-2">
            <div className="flex h-full flex-col p-2 text-center">
              <Link href={`mpi/dessert`}>
                <div className="cursor-pointer hover:underline">
                  <Image
                    src={require('@/assets/logos/dessert.svg')}
                    alt="Desserts Icon"
                  />
                  <h2 className="text-lg font-bold text-steam-green-text-50">
                    Desserts
                  </h2>
                </div>
              </Link>
              <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
              <ul className="p-2 text-center text-base font-light">
                {data
                  .filter(entry => entry.category === 'dessert')
                  .map(starter => {
                    return (
                      <li className="m-2 hover:underline" key={starter.id}>
                        <Link href={`mpi/dessert/${starter.slug}`}>
                          <a>{starter.title}</a>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
            <div className="p-2 text-center"></div>
          </div>
          <div className="order-2 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg lg:order-none lg:row-span-3">
            <div className="flex h-full flex-col p-2 text-center">
              <Link href={`mpi/main`}>
                <div className="cursor-pointer hover:underline">
                  <Image
                    src={require('@/assets/logos/main-meal.svg')}
                    alt="Main meals Icon"
                  />
                  <h2 className="text-lg font-bold text-steam-green-text-50">
                    Main meals
                  </h2>
                </div>
              </Link>
              <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
              <ul className="p-2 text-center text-base font-light">
                {data
                  .filter(entry => entry.category === 'main')
                  .map(starter => {
                    return (
                      <li
                        className="m-2 hover:underline lg:py-6"
                        key={starter.id}
                      >
                        <Link href={`mpi/main/${starter.slug}`}>
                          <a>{starter.title}</a>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
          <div className="order-4 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg lg:order-none lg:col-span-1 lg:col-start-1 lg:row-start-3">
            <div className="flex h-full flex-col p-2 text-center">
              <div className="flex flex-col p-2 text-center">
                <Link href={`mpi/beverage`}>
                  <div className="flex cursor-pointer items-center justify-evenly hover:underline">
                    <Image
                      src={require('@/assets/logos/beverage.svg')}
                      alt="Beverages Icon"
                    />
                    <h2 className="text-lg font-bold text-steam-green-text-50">
                      Beverages
                    </h2>
                  </div>
                </Link>
                <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
              </div>
              <div>
                <ul className="p-2 text-center text-base font-light">
                  {data
                    .filter(entry => entry.category === 'beverage')
                    .map(starter => {
                      return (
                        <li className="m-2 hover:underline" key={starter.id}>
                          <Link href={`mpi/beverage/${starter.slug}`}>
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
          <div className="order-5 rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-3">
            <div className="flex h-full flex-col p-2 text-center">
              <div className="flex flex-col p-2 text-center">
                <Link href={`mpi/takeaway`}>
                  <div className="flex cursor-pointer items-center justify-evenly hover:underline">
                    <Image
                      src={require('@/assets/logos/takeaway.svg')}
                      width={88}
                      height={79}
                      alt="Beverages Icon"
                    />
                    <h2 className="text-lg font-bold text-steam-green-text-50">
                      On the way home
                    </h2>
                  </div>
                </Link>
                <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
              </div>
              <div>
                <ul className="p-2 text-center text-base font-light">
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
  )
}

export default Mpi
