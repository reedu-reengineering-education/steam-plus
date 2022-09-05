import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Compare from '@/components/Map/Compare'
import { Layer, Source } from 'react-map-gl'

export default {
  title: 'Maps/Compare',
  component: Compare,
} as ComponentMeta<typeof Compare>

const Template: ComponentStory<typeof Compare> = args => (
  <div className="h-96">
    <Compare
      beforeMapProps={{
        mapStyle: `https://api.maptiler.com/maps/outdoor/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      }}
      {...args}
    />
  </div>
)

export const Default = Template.bind({})
