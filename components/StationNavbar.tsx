import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Line } from './TubeMap/line'
import { Station } from './TubeMap/station'

const lineVariants = {
  teacher: 'border-trail-teacher-500 text-trail-teacher-500',
  policy: 'border-trail-policy-500 text-trail-policy-500',
  educational: 'border-trail-educational-500 text-trail-educational-500',
  student: 'border-trail-student-500 text-trail-student-500',
}

type StationNavbarProps = {
  line: 'teacher' | 'student' | 'policy' | 'educational'
  neighbours: {
    previous: Station
    next: Station
  }
  interchangeableLine: Line | null | undefined
  interchangeableStation: Station | null | undefined
  interchangeableStationOrder: string
}

const StationNavbar = ({
  line,
  neighbours,
  interchangeableLine,
  interchangeableStation,
  interchangeableStationOrder,
}: StationNavbarProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex hover:cursor-pointer">
        {neighbours.previous ? (
          <Link href={`/trail/${line}/${neighbours.previous?.name}`} passHref>
            <div
              className={`flex items-center justify-around gap-2 rounded-l-lg border-2 px-2 ${lineVariants[line]}`}
            >
              <ArrowLeftCircleIcon className="h-8 w-8 stroke-2" />
              <span className="w-32 text-sm line-clamp-3">
                {neighbours.previous.label}
              </span>
            </div>
          </Link>
        ) : null}
        {interchangeableStation && interchangeableStationOrder === 'previous' && (
          <Link href={`${interchangeableStation.link}`} passHref>
            <div
              className={`flex items-center justify-around gap-2 rounded-l-lg border-2 px-2 ${lineVariants[line]}`}
            >
              <span className="w-32 text-center text-sm line-clamp-3">
                {interchangeableStation.label}
              </span>
              <ArrowRightCircleIcon className="h-8 w-8 stroke-2" />
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2 hover:cursor-pointer">
        {neighbours.next ? (
          <Link href={`/trail/${line}/${neighbours.next?.name}`} passHref>
            <div
              className={`flex items-center justify-around gap-2 rounded-r-lg border-2 px-2 ${lineVariants[line]}`}
            >
              <span className="w-32 text-center text-sm line-clamp-3">
                {neighbours.next.label}
              </span>
              <ArrowRightCircleIcon className="h-8 w-8 stroke-2" />
            </div>
          </Link>
        ) : null}
        {interchangeableStation && interchangeableStationOrder === 'next' ? (
          <Link href={`${interchangeableStation.link}`} passHref>
            <div
              className={`flex items-center justify-around gap-2 rounded-r-lg border-2 border-dashed px-2 ${lineVariants[line]}`}
            >
              <span className="w-32 text-center text-sm line-clamp-3">
                {interchangeableStation.label}
              </span>
              <ArrowRightCircleIcon className="h-8 w-8 stroke-2" />
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default StationNavbar
