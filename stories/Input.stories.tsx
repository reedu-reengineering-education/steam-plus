import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from '@/components/Elements/Button'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { InputField } from '@/components/Elements/Input'

export default {
  title: 'Components/Input',
  component: InputField,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof InputField> = args => (
  <InputField {...args} />
)

export const Text = Template.bind({})

export const Number = Template.bind({})
Number.args = {
  type: 'number',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Label',
}

export const WithLabelAndError = Template.bind({})
WithLabelAndError.args = {
  label: 'Label',
  error: {
    message: 'Invalid input',
  },
}
