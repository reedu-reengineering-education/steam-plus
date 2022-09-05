import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
  { name: 'ILIP', href: '/ilip' },
  { name: 'MPI', href: '/mpi' },
  { name: 'Glossary', href: '/glossary' },
]

const Navbar = () => {
  const router = useRouter()

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded p-2 hover:bg-ocean-green-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon
                      className="block h-6 w-6 text-ocean-green hover:text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <MenuIcon
                      className="block h-6 w-6 text-ocean-green hover:text-white"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/'} passHref>
                    <a>
                      <div className="relative h-12 w-36">
                        <Image
                          src={require('@/assets/logos/steam-plus-logo.png')}
                          alt="Logo"
                          layout="fill"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex h-full space-x-4">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            router.pathname.includes(item.href)
                              ? 'bg-ocean-green text-white'
                              : 'text-ocean-green hover:bg-ocean-green-200 hover:text-white',
                            'my-auto h-fit rounded px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={
                            router.pathname.includes(item.href)
                              ? 'page'
                              : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    router.pathname.includes(item.href)
                      ? 'bg-ocean-green text-white'
                      : 'text-ocean-green hover:bg-ocean-green-300 hover:text-white',
                    'block rounded px-3 py-2 text-base font-medium',
                  )}
                  aria-current={
                    router.pathname.includes(item.href) ? 'page' : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
