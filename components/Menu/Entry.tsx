import 'flag-icons/css/flag-icons.min.css'

import MenuIcon from './Icon'
import Markdown from '../Post/Markdown'
import { useRouter } from 'next/router'
import { getDirectusClient } from '@/lib/directus'
import { useEffect, useState } from 'react'
import markdownToHtml from '@/lib/markdownToHtml'

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
  const router = useRouter()

  const [countryData, setDataCountry] = useState<string>()

  useEffect(() => {
    const { country } = router.query

    if (!country || country === '' || country.length > 3) {
      return
    }

    const fetchData = async () => {
      const directus = await getDirectusClient()
      try {
        const data = await directus
          .items('side_dish_country')
          .readOne(country as string)

        const markdown = await markdownToHtml(data?.description || '')
        setDataCountry(markdown)
      } catch (error) {
        return
      }
    }

    fetchData()

    return () => {}
  }, [router.query])

  const onClick = (countryCode: string) => {
    router.replace({
      pathname: router.pathname,
      query: {
        category: router.query.category,
        slug: router.query.slug,
        country: countryCode,
      },
    })
  }

  return (
    <div className="mx-auto flex w-full flex-col rounded-b rounded-tr-3xl border border-steam-green bg-steam-green-50 p-12 drop-shadow-lg lg:w-2/3">
      <div className="flex flex-col p-2 text-center">
        <div className="">
          <MenuIcon category={category} />
          <h2 className="text-3xl font-bold text-steam-green-text-50">
            {title}
          </h2>
        </div>
        <hr className="my-4 h-[2px] border-0 bg-steam-green-100" />
        <ul className="p-2 text-left text-sm font-light">
          <div className="mx-auto max-w-2xl p-4">
            <Markdown content={markdown} />
            {category === 'main' && title.toLowerCase() === 'side dishes' ? (
              <div className="grid grid-cols-4 gap-3">
                <button
                  className="fib fi-at md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('at')}
                ></button>
                <button
                  className="fib fi-nl md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('nl')}
                ></button>
                <button
                  className="fib fi-no md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('no')}
                ></button>
                <button
                  className="fib fi-de md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('de')}
                ></button>
                <button
                  className="fib fi-be md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('be')}
                ></button>
                <button
                  className="fib fi-it md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('it')}
                ></button>
                <button
                  className="fib fi-dk md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('dk')}
                ></button>
                <button
                  className="fib fi-ro md:h-18 md:w-18 mx-auto h-12 w-12 lg:h-24 lg:w-24"
                  onClick={() => onClick('ro')}
                ></button>
              </div>
            ) : null}
            {countryData ? <Markdown content={countryData} /> : null}
          </div>
        </ul>
      </div>
    </div>
  )
}
