import MenuEntry from '@/components/Menu/Entry'
import markdownToHtml from '@/lib/markdownToHtml'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient } from '../../../lib/directus'

interface IParams extends ParsedUrlQuery {
  id: string
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    filter: {
      category: 'main',
    },
    fields: 'slug',
    limit: -1,
  })

  if (data) {
    return {
      paths: data.map(entry => {
        return {
          params: {
            slug: entry.slug.toString(),
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
  const { slug } = context.params! as IParams

  const directus = await getDirectusClient()

  const content = await directus.items('mpi').readByQuery({
    filter: {
      slug: slug,
    },
    fields: ['*', 'author.first_name', 'author.last_name'],
  })
  let markdown = ''
  let title = ''
  if (content.data) {
    title = content.data[0].title || ''
    markdown = await markdownToHtml(content.data[0]?.markdown || '')
  }

  return {
    props: {
      title,
      markdown: markdown,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 30, // In seconds
  }
}

type MpiStartersPageProps = {
  title: string
  markdown: string
}

export default function MpiStartersPage({
  title,
  markdown,
}: MpiStartersPageProps) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <MenuEntry iconSrc="main-meals" title={title} markdown={markdown} />
}
