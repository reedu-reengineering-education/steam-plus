import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Spacer } from '@/components/Elements/Spacer'

export default {
  title: 'Components/Spacer',
  component: Spacer,
} as ComponentMeta<typeof Spacer>

const Template: ComponentStory<typeof Spacer> = args => <Spacer {...args} />

export const Default = Template.bind({})

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
}
