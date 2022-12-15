import PostBody from '@/components/Post/Body'
import MenuIcon from './Icon'

type MenuEntryProps = {
  category: string
  title: string
  markdown: string
}

export default function MenuEntry({
  category,
  title,
  markdown,
}: MenuEntryProps) {
  return (
    <div className="mx-auto flex flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg">
      <div className="flex flex-col p-2 text-center">
        <div className="">
          <MenuIcon category={category} />
          <h2 className="text-steam-green-text-50">{title}</h2>
        </div>
        <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
        <ul className="p-2 text-left text-sm font-light">
          <PostBody content={markdown} />
        </ul>
      </div>
    </div>
  )
}
