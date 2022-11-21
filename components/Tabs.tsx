import { Tab } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const lines = {
  Teacher: [
    {
      id: 1,
      title: 'Add some description here',
    },
  ],
  Educational: [
    {
      id: 1,
      title: 'Add some description here',
    },
  ],
  Policy: [
    {
      id: 1,
      title: 'Add some description here',
    },
  ],
  Student: [
    {
      id: 1,
      title: 'Add some description here',
    },
  ],
}

export default function Tabs() {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(lines).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-steam-green-text',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-steam-green focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(lines).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              )}
            >
              <ul>
                {posts.map(post => (
                  <li key={post.id} className="relative rounded-md p-3">
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <p className="absolute inset-0 rounded-md" />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
