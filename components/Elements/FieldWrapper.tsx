import clsx from 'clsx'
import * as React from 'react'

type FieldWrapperProps = {
  label?: string
  className?: string
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, children } = props
  return (
    <div className={clsx('mt-2 mb-4', className)}>
      <label className="ml-2 block text-sm font-semibold">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  )
}
