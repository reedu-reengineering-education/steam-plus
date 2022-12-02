import { Spacer } from '@/components/Elements/Spacer'
import MenuIcon from '@/components/Menu/Icon'
import { getDirectusClient, Mpi } from '@/lib/directus'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  category: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    fields: ['category'],
    groupBy: 'category',
  })

  if (data) {
    return {
      paths: data.map(entry => {
        return {
          params: {
            category: entry.category.toString(),
          },
        }
      }),
      fallback: true,
    }
  } else {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { category } = context.params! as IParams

  const directus = await getDirectusClient()

  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: category,
    },
    fields: ['*', 'author.first_name', 'author.last_name'],
  })

  return {
    props: {
      category: category,
      entries: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 30, // In seconds
  }
}

type MenuCategoryPageProps = {
  category: string
  entries: Mpi[]
}

const MenuCategoryPage = ({ category, entries }: MenuCategoryPageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold capitalize text-zinc-600">
          {category}
        </h1>
        <Spacer />
        <p className="pt-4 text-base font-light">
          Add description here from CMS
        </p>
      </div>
      <div className="flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <div className="flex flex-col p-2 text-center">
          <div className="cursor-pointer hover:underline">
            <MenuIcon category={category} />
            <h2 className="capitalize text-steam-green-text-50">{category}</h2>
          </div>
          <hr className="my-4 h-px border-0 bg-steam-green-100" />
          <ul className="p-2 text-left text-sm font-light">
            {entries &&
              entries.map(entry => {
                return (
                  <li
                    className="m-2 cursor-pointer hover:underline"
                    key={entry.id}
                  >
                    <Link href={`/mpi/${entry.category}/${entry.slug}`}>
                      <a>{entry.title}</a>
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

export default MenuCategoryPage
