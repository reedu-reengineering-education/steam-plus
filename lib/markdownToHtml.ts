import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehypeVideo from 'rehype-video'
import stringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    // .use(html, {
    //   sanitize: true,
    // })
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, { details: false })
    .use(stringify)
    .process(markdown)
  return result.toString()
}
