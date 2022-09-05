import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Map from '@/components/Map'

export default {
  title: 'Maps/Map',
  component: Map,
} as ComponentMeta<typeof Map>

const Template: ComponentStory<typeof Map> = args => (
  <div className="h-96 w-full overflow-hidden rounded">
    {/* don't pass all args here as it will have an impact on performance */}
    <Map onClick={args.onClick} />
  </div>
)

export const Default = Template.bind({})
