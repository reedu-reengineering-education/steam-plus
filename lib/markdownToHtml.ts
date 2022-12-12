import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { MdastRoot } from 'remark-rehype/lib'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkYoutube)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)
  return String(result)
}

// This plugin is an example to turn `::youtube` into iframes.
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
function remarkYoutube() {
  return (tree: MdastRoot) => {
    visit(tree, node => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'youtube') return

        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}
        const id = attributes.id

        data.hName = 'iframe'
        data.hProperties = {
          class: 'yt-video',
          src: 'https://www.youtube.com/embed/' + id,
          width: 200,
          height: 200,
          frameBorder: 0,
          allow: 'picture-in-picture',
          allowFullScreen: true,
        }
      }
    })
  }
}
