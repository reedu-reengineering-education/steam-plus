import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getDirectusClient, Ilip } from '../../lib/directus'

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const directus = await getDirectusClient()
  const { data } = await directus.items('ilip').readByQuery({
    fields: 'id',
    limit: -1,
  })

  if (data) {
    return {
      paths: data.map(entry => {
        return {
          params: { id: entry.id.toString() },
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
  const { id } = context.params! as IParams

  const directus = await getDirectusClient()

  const content = await directus.items('ilip').readOne(id, {
    fields: ['*', 'author.first_name', 'author.last_name'],
  })

  return {
    props: {
      content,
    },
  }
}

type IlipSinglePageProps = {
  content: Ilip
}

export default function IlipPage({ content }: IlipSinglePageProps) {
  console.log(content)
  return (
    <div className="current-article">
      <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
    </div>
  )
}
