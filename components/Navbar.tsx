import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  ArrowLeftCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
  { name: 'TRAIL', href: '/trail' },
  { name: 'MPI', href: '/mpi' },
  { name: 'Glossary', href: '/glossary' },
  {
    name: 'Back to STEAM+',
    href: 'https://www.steamtalent.eu/',
    icon: <ArrowLeftCircleIcon />,
  },
]

const Navbar = () => {
  const router = useRouter()

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 w-full items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded p-2 hover:bg-ocean-green-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 text-ocean-green hover:text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
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
                <div className="hidden w-full sm:ml-6 sm:block">
                  <div className="flex h-full">
                    {navigation.map((item, i, { length }) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            router.pathname.includes(item.href)
                              ? 'bg-ocean-green text-white'
                              : 'text-ocean-green hover:bg-ocean-green-200 hover:text-white',
                            'my-auto h-fit rounded px-3 py-2 text-sm font-medium',
                            i + 1 === length ? 'ml-auto' : 'ml-4',
                          )}
                          aria-current={
                            router.pathname.includes(item.href)
                              ? 'page'
                              : undefined
                          }
                        >
                          <div className="flex">
                            <span>{item.name}</span>
                            {item.icon && (
                              <div className="ml-2">
                                <ArrowLeftCircleIcon className="h-5 w-5" />
                              </div>
                            )}
                          </div>
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
