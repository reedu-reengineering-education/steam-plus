import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  return (
    <p
      className={markdownStyles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Markdown
