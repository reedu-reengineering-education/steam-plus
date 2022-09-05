import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/Input'
import { Spacer } from '@/components/Elements/Spacer'
import { Spinner } from '@/components/Elements/Spinner'
import Map from '@/components/Map'
import Modal from '@/components/Modal'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'

import dynamic from 'next/dynamic'
import { Layer, Source } from 'react-map-gl'
const Compare = dynamic(() => import('@/components/Map/Compare'), {
  ssr: false,
})

import Dual from '@/components/Map/Dual'

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
        <h2 className="p-2 text-center text-2xl">PVP App</h2>
        <Button>Hello World</Button>
        <Spacer />
        <Spinner />
        <Spacer />
        <InputField type={'text'} label="Sample text input" />
        <Spacer />
        <InputField type={'number'} label="Sample number input" />
        <Spacer />
        <div className="relative h-96 overflow-hidden rounded">
          <Map />
        </div>
        <Spacer />
        <div className="h-96 overflow-hidden rounded">
          <Compare
            beforeMapProps={{
              mapStyle: `https://api.maptiler.com/maps/outdoor/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
            }}
            afterMapProps={{
              children: (
                <Source
                  type="geojson"
                  data={'https://api.opensensemap.org/boxes?format=geojson'}
                >
                  <Layer id="data" type="heatmap" />
                </Source>
              ),
            }}
          />
        </div>
        <Spacer />
        <div className="h-96 overflow-hidden rounded">
          <Dual
            beforeMapProps={{
              mapStyle: `https://api.maptiler.com/maps/outdoor/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
            }}
            afterMapProps={{
              children: (
                <Source
                  type="geojson"
                  data={'https://api.opensensemap.org/boxes?format=geojson'}
                >
                  <Layer id="data" type="heatmap" />
                </Source>
              ),
            }}
          />
        </div>
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
