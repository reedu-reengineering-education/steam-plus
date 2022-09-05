import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/Input'
import { Spacer } from '@/components/Elements/Spacer'
import { Spinner } from '@/components/Elements/Spinner'
import Modal from '@/components/Modal'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        <div className="relative mx-auto h-32 w-32">
          <Image
            src={require('@/assets/logos/pvp-logo.png')}
            alt="Logo"
            layout="fill"
          />
        </div>
        <Spacer />
        <h2 className="p-2 text-center text-2xl">Steam+</h2>
        <Button>Hello World</Button>
        <Spacer />
        <Spinner />
        <Spacer />
        <InputField type={'text'} label="Sample text input" />
        <Spacer />
        <InputField type={'number'} label="Sample number input" />
        <Spacer />
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          title="Hello World"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Button onClick={() => setModalOpen(false)}>Close Modal</Button>
        </Modal>
      </div>
    </div>
  )
}

export default Home
