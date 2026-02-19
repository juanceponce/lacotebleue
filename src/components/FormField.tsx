import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

interface BaseFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
}

interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  as?: 'input'
}

interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  as: 'textarea'
}

interface SelectFieldProps extends BaseFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  as: 'select'
  children: ReactNode
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps

const baseInputStyles = `
  w-full px-4 py-3 rounded-lg border border-sand-300 bg-white
  text-ink-900 placeholder:text-ink-400
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-marine-500 focus:border-transparent
  disabled:bg-sand-100 disabled:cursor-not-allowed
`

export function FormField(props: FormFieldProps) {
  const { label, error, hint, required, as = 'input', ...rest } = props
  const id = rest.id || rest.name || label.toLowerCase().replace(/\s+/g, '-')

  const inputStyles = `${baseInputStyles} ${error ? 'border-red-500 focus:ring-red-500' : ''}`

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-ink-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          className={`${inputStyles} min-h-[120px] resize-y`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          className={`${inputStyles} cursor-pointer`}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectFieldProps).children}
        </select>
      ) : (
        <input
          id={id}
          className={inputStyles}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint && !error && (
        <p className="text-sm text-ink-500">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-600" role="alert">{error}</p>
      )}
    </div>
  )
}
