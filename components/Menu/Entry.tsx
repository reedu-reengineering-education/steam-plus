import 'flag-icons/css/flag-icons.min.css'
import MenuIcon from './Icon'
import Markdown from '../Post/Markdown'

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
  console.log('Menu Entry: ', category, title)

  return (
    <div className="mx-auto flex flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-4 drop-shadow-lg">
      <div className="flex flex-col p-2 text-center">
        <div className="">
          <MenuIcon category={category} />
          <h2 className="text-steam-green-text-50">{title}</h2>
        </div>
        <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
        <ul className="p-2 text-left text-sm font-light">
          <div className="mx-auto max-w-2xl p-4">
            <Markdown content={markdown} />
            {category === 'main' && title.toLowerCase() === 'side dishes' ? (
              <div className="grid grid-cols-4 gap-3">
                <button className="fib fi-at h-32 w-32"></button>
                <button className="fib fi-nl h-32 w-32"></button>
                <button className="fib fi-no h-32 w-32"></button>
                <button className="fib fi-de h-32 w-32"></button>
                <button className="fib fi-be h-32 w-32"></button>
                <button className="fib fi-it h-32 w-32"></button>
                <button className="fib fi-dk h-32 w-32"></button>
                <button className="fib fi-ro h-32 w-32"></button>
              </div>
            ) : null}
          </div>
        </ul>
      </div>
    </div>
  )
}
