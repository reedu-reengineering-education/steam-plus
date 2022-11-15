import { Spacer } from '@/components/Elements/Spacer'
import SlideOver from '@/components/SlideOver'
import { getDirectusClient, Glossary } from '@/lib/directus'
import { useState } from 'react'

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
  console.log(dict)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedGlossaryEntry, setSelectedGlossaryEntry] = useState<Glossary>()

  const openSlideOver = (glossary: Glossary) => {
    setSelectedGlossaryEntry(glossary)
    setOpen(!open)
  }

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="w-full lg:w-1/3 ">
        <h1 className="text-2xl">Glossary</h1>
        <Spacer></Spacer>
        <h3 className="text-sm">What´s a glossary?</h3>
        <Spacer></Spacer>
        <span className="text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam
          blanditiis doloribus dolor inventore expedita, veniam ipsa
          voluptatibus molestiae sed doloremque eos natus libero at consequatur
          dolores cumque amet saepe!
        </span>
      </div>
      <div className="flex w-full flex-col rounded-md border-2 border-ocean-green-500 bg-steam-green-50 p-4 drop-shadow-lg lg:w-2/3">
        <h1 className="text-center text-2xl font-bold uppercase text-ocean-green-500">
          Glossary
        </h1>
        <div className="flex flex-col divide-y-2">
          <div className="p-4">
            <input
              className="w-full rounded-md p-2 text-ocean-green-300 focus:outline-none focus:ring-2 focus:ring-ocean-green-300"
              type="text"
              name=""
              id=""
              value={searchTerm}
              placeholder="Search glossary"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-10 p-4">
          {Object.entries(dict).map(([key, value], index) => {
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
