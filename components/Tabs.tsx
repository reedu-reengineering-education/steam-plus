import { Tab } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const lines = {
  All: [
    {
      id: 1,
      text: 'Add some description here',
    },
  ],
  Teacher: [
    {
      id: 1,
      text: 'Welcome to the ‘teacher-line’.',
    },
    {
      id: 2,
      text: 'The Innovation Lab Implementation Path (ILIP) of the STEAM+ project provides a guideline for teachers, higher education institutions, policy makers and students to start their own transdisciplinary innovation labs visualised in a metro map. At every stop a new step is presented with the information for the particular ‘passenger’ on the line. This information was gathered through theory of change exercises, a survey and meet-ups with the involved stakeholders during the course of the STEAM+ project.',
    },
    {
      id: 3,
      text: 'An innovation lab requires collaboration over different levels within the education system, at times bringing together teachers, students, higher education policy representatives and educational policy makers. Several stops are shared with other lines indicating that at this stop collaboration with others is necessary.',
    },
    {
      id: 4,
      text: 'The teacher line will take you from the teachers’ lounge all the way to the Innovation Lab. The first part of the line contains several inspiring stops. If you are already familiar with the content of these stops, please just stay on board until the next part of the line. If you want to figure out what this is all about, please hop off and explore the station to learn whether you want to continue your journey.',
    },
  ],
  Educational: [
    {
      id: 1,
      text: 'Add some description here',
    },
  ],
  Policy: [
    {
      id: 1,
      text: 'This is the Policy makers line towards the implementation of STEAM+ innovation labs. Though Policy makers are not directly involved in the implementation of courses or pedagogical methods, you do play a crucial role to ensuring that education can be qualitive and prepare people for the future challenges of society. Policy will define boundaries to what is possible and what is not. Therefore, the STEAM+ project not only provides policy makers with a menu for policy inspiration (MPI) where you will find handy tools and inspiring material but also offers a space on the high-speed train through the innovation lab implementation path (ILIP). This train stops at the different points where policy bottlenecks may lie and how policy can affect the implementation of the STEAM+ innovation lab.',
    },
    {
      id: 2,
      text: 'There are regional and national differences in education policy that translate into different levels of preparedness for innovation labs. As the ILIP is a pathway some stops might therefore not be relevant to your specific situation. In these cases, you can take the ‘train’ further to the next station.',
    },
  ],
  Student: [
    {
      id: 1,
      text: 'Welcome on the ‘student-line’.',
    },
    {
      id: 2,
      text: 'There are several stops which will give you inspiration to continue. If you are familiar to the content of these stops, please just stay on board to the next station. If you want to figure out what this is all about, please hop off at this station and explore the station to learn whether you want to continue your journey.',
    },
  ],
}

type TabsProps = {
  onChange: (index: number) => void
}

export default function Tabs({ onChange }: TabsProps) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group onChange={onChange}>
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
                'ring-white ring-opacity-60',
              )}
            >
              <ul>
                {posts.map(post => (
                  <li key={post.id} className="relative rounded-md p-3">
                    <h3 className="text-sm font-medium leading-5">
                      {post.text}
                    </h3>
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
