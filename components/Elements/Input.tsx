import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password' | 'number'
    className?: string
    error?: any
  }

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, error, ...other } = props
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={clsx(
          'focus:zinc-blue-500 block w-full appearance-none rounded border border-zinc-300 px-4 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none sm:text-sm',
          className,
        )}
        {...other}
      />
      {error?.message && (
        <small className="text-red-500">{error.message}</small>
      )}
    </FieldWrapper>
  )
}
