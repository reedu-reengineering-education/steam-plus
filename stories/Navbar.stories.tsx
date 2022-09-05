import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = () => (
  <SessionProvider>
    <Navbar />
  </SessionProvider>
)

export const Default = Template.bind({})
