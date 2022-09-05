import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Spinner } from '@/components/Elements/Spinner'

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = args => <Spinner {...args} />

export const Default = Template.bind({})

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
}

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
}

export const Light = Template.bind({})
Light.args = {
  variant: 'light',
}
