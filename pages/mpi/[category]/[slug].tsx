import MenuEntry from '@/components/Menu/Entry'
import markdownToHtml from '@/lib/markdownToHtml'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { getDirectusClient, SideDishCountry } from '../../../lib/directus'

interface IParams extends ParsedUrlQuery {
  category: string
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const directus = await getDirectusClient()
  const { data } = await directus.items('mpi').readByQuery({
    fields: ['category', 'slug'],
  })

  if (data) {
    return {
      paths: data.map(entry => {
        return {
          params: {
            category: entry.category.toString(),
            slug: entry.slug.toString(),
          },
        }
      }),
      fallback: false,
    }
  } else {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { category, slug } = context.params! as IParams

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
    markdown = await markdownToHtml(content.data[0].markdown || '')
  }

  return {
    props: {
      category,
      title: title,
      markdown: markdown,
    },
  }
}

type MpiStartersPageProps = {
  category: string
  title: string
  markdown: string
}

export default function MpiStartersPage({
  category,
  title,
  markdown,
}: MpiStartersPageProps) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <MenuEntry category={category} title={title} markdown={markdown} />
}
