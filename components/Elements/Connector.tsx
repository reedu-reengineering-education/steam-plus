import clsx from 'clsx'
import * as React from 'react'

const variants = {
  teacher: 'border-trail-teacher',
  policy: 'border-trail-policy',
  student: 'border-trail-student',
  educational: 'border-trail-educational',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variants
}

export const Connector = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ type = 'button', className = '', variant = 'teacher', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('border-2', variants[variant], className)}
        {...props}
      ></div>
    )
  },
)

Connector.displayName = 'Connector'
