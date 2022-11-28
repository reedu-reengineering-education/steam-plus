import { Tab } from '@headlessui/react'
import PostBody from './Post/Body'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export type Tab = {
  id: number
  name: string
  description: string
  markdown: string
}

type TabsProps = {
  tabs: Tab[]
  onChange: (index: number) => void
}

export default function Tabs({ tabs, onChange }: TabsProps) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group onChange={onChange}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              className={() =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'capitalize ring-opacity-60 ring-offset-2 focus:outline-none focus:ring',
                  tab.name.toLowerCase() === 'teacher'
                    ? 'bg-trail-teacher hover:bg-trail-teacher-400'
                    : '',
                  tab.name.toLowerCase() === 'educational'
                    ? 'bg-trail-educational ring-trail-educational-500 hover:bg-trail-educational-400'
                    : '',
                  tab.name.toLowerCase() === 'policy'
                    ? 'bg-trail-policy ring-trail-policy-500 hover:bg-trail-policy-400'
                    : '',
                  tab.name.toLowerCase() === 'student'
                    ? 'bg-trail-student ring-trail-student-500 hover:bg-trail-student-400'
                    : '',
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60',
              )}
            >
              <div className="current-article">
                <PostBody content={tab.markdown} />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
