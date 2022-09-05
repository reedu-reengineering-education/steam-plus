import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Compare from '@/components/Map/Compare'
import { Layer, Source } from 'react-map-gl'
import Dual from '@/components/Map/Dual'

export default {
  title: 'Maps/Dual',
  component: Dual,
} as ComponentMeta<typeof Dual>

const Template: ComponentStory<typeof Dual> = args => (
  <div className="h-96">
    <Dual
      beforeMapProps={{
        mapStyle: `https://api.maptiler.com/maps/outdoor/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
      }}
      {...args}
    />
  </div>
)

export const Default = Template.bind({})
