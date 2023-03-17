import SlideOver from '@/components/SlideOver'
import { getDirectusClient, Glossary } from '@/lib/directus'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface Dictionary<T> {
  [Key: string]: T
}

export async function getServerSideProps() {
  const directus = await getDirectusClient()
  const { data } = await directus.items('glossary').readByQuery({
    sort: ['term'],
  })

  const dict: Dictionary<Glossary[]> = {}

  for (const entry of data as Glossary[]) {
    if (entry != undefined) {
      const firstChar = entry.term.charAt(0).toLocaleLowerCase()
      if (dict[`${firstChar}`]) {
        dict[firstChar] = [...dict[firstChar], entry]
      } else {
        dict[firstChar] = [entry]
      }
    }
  }

  return {
    props: {
      dict: dict,
    }, // will be passed to the page component as props
  }
}

type GlossaryPageProps = {
  dict: Dictionary<Glossary[]>
}

const Glossary = ({ dict }: GlossaryPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [glossaryDictionary, setGlossaryDictionary] =
    useState<Dictionary<Glossary[]>>(dict)
  const [selectedGlossaryEntry, setSelectedGlossaryEntry] = useState<Glossary>()

  const openSlideOver = (glossary: Glossary) => {
    setSelectedGlossaryEntry(glossary)
    setOpen(!open)
  }

  useEffect(() => {
    const fetchData = async () => {
      const directus = await getDirectusClient()
      const { data } = await directus.items('glossary').readByQuery({
        filter: {
          term: {
            _contains: searchTerm,
          },
        },
      })

      const dict: Dictionary<Glossary[]> = {}

      for (const entry of data as Glossary[]) {
        if (entry != undefined) {
          const firstChar = entry.term.charAt(0).toLocaleLowerCase()
          if (dict[`${firstChar}`]) {
            dict[firstChar] = [...dict[firstChar], entry]
          } else {
            dict[firstChar] = [entry]
          }
        }
      }

      setGlossaryDictionary(dict)
    }

    if (searchTerm !== '') {
      fetchData()
    } else {
      setGlossaryDictionary(dict)
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="flex w-full flex-col rounded-md border border-ocean-green-500 bg-steam-green-50 p-12 drop-shadow-lg lg:w-2/3">
        <h1 className="text-center text-2xl font-bold uppercase text-ocean-green-500">
          Glossary
        </h1>
        <div className="flex flex-col divide-y-2 pt-10">
          <div className="flex items-center">
            <input
              className="w-full rounded-md p-2 text-ocean-green-300 focus:outline-none focus:ring-2 focus:ring-ocean-green-300"
              type="text"
              name=""
              id=""
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search glossary"
            />
            {searchTerm.length > 0 ? (
              <div className="absolute right-6">
                <button
                  type="button"
                  className="rounded-md p-1 text-ocean-green hover:bg-ocean-green-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setSearchTerm('')}
                >
                  <span className="sr-only">Delete search term</span>
                  <TrashIcon
                    className="h-5 w-5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-10 p-4">
          {Object.entries(glossaryDictionary).map(([key, value], index) => {
            return (
              <div key={index} className="m-2 w-1/5">
                <h1
                  key={key}
                  className="pb-2 text-xl font-bold uppercase text-gray-500"
                >
                  {key}
                </h1>
                <ul>
                  {value.map((glossary, index) => {
                    return (
                      <li
                        className="cursor-pointer hover:underline"
                        key={glossary.id}
                        onClick={() => openSlideOver(glossary)}
                      >
                        {glossary.term}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <SlideOver
        open={open}
        setOpen={setOpen}
        content={selectedGlossaryEntry}
      />
    </div>
  )
}

export default Glossary
