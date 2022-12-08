import clsx from 'clsx'
import * as React from 'react'

const variants = {
  teacher: 'border-trail-teacher',
  policy: 'border-trail-policy',
  student: 'border-trail-student',
  educational: 'border-trail-educational',
}

const sides = {
  left: 'border-l-2',
  right: 'border-r-2',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variants
  side?: keyof typeof sides
}

export const BorderY = React.forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'teacher',
      side = 'left',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('flex', sides[side], variants[variant], className)}
        {...props}
      ></div>
    )
  },
)

BorderY.displayName = 'BorderY'
