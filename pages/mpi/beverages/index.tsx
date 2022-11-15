import { Spacer } from '@/components/Elements/Spacer'
import { getDirectusClient, Mpi } from '@/lib/directus'
import Link from 'next/link'

// export async function getServerSideProps() {
//   // const directus = await getDirectusClient()
//   // const { data } = await directus.items('ilip').readByQuery()

//   // return {
//   //   props: {
//   //     data: data,
//   //   }, // will be passed to the page component as props
//   // }
// }

type MpiStarterPageProps = {
  data: Mpi[]
}

const MpiBeverages = ({ data }: MpiStarterPageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-zinc-600">Beverages</h1>
        <Spacer />
      </div>
      <div className="flex w-full flex-col rounded-md border-2 p-4 drop-shadow-lg lg:w-2/3"></div>
    </div>
  )
}

export default MpiBeverages
