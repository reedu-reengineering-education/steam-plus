import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-zinc-600">
          Steam+ Outputs
        </h2>
        <Spacer />
        <span className="text-base font-light">
          The STEAM+ partners work together to create two main products. One is
          aimed at supporting higher education institutions to implement
          transdisciplinary talent programs, and the other at inspiring policy
          makers at different levels to support and recognize such programs.
        </span>
        <Spacer />
        <div className="grid grid-flow-col grid-cols-1 grid-rows-2 gap-4 pt-8 lg:grid-cols-2 lg:grid-rows-1">
          <div className="cursor-pointer rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
            <Link href={`mpi`}>
              <div className="flex h-full flex-col p-2 text-center">
                <div className="cursor-pointer hover:underline">
                  <h2 className="text-lg font-bold text-steam-green-text-50">
                    STEAM+ Menu for Policy Inspiration (MPI)
                  </h2>
                </div>
                <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
                <span className="p-2 text-center text-base font-light">
                  An instrument on how to establish transdisciplinary talent
                  programs in Higher Education.
                </span>
              </div>
            </Link>
          </div>
          <div className="cursor-pointer rounded-b rounded-tr-2xl border border-steam-green bg-steam-green-50 drop-shadow-lg">
            <Link href={`trail`}>
              <div className="flex h-full flex-col p-2 text-center">
                <div className="cursor-pointer hover:underline">
                  <h2 className="text-lg font-bold text-steam-green-text-50">
                    STEAM+ Innovation Lab Implementation (TRAIL)
                  </h2>
                </div>
                <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
                <span className="p-2 text-center text-base font-light">
                  An instrument for policy makers at HE, local, regional,
                  national and EU levels to support and recognize (development
                  of) such programs.
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
