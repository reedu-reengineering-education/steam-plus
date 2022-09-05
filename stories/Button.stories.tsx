import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '@/components/Elements/Button'
import { ArrowRightIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = args => (
  <Button {...args}>Button</Button>
)

export const Primary = Template.bind({})

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
}

export const Small = Template.bind({})
Small.args = {
  size: 'sm',
}

export const Inverse = Template.bind({})
Inverse.args = {
  variant: 'inverse',
}

export const Danger = Template.bind({})
Danger.args = {
  variant: 'danger',
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true,
}

export const EndIcon = Template.bind({})
EndIcon.args = {
  endIcon: <ArrowRightIcon className="h-4 w-4" />,
}
