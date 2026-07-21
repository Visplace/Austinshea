import type { MouseEventHandler, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

interface CommonProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
  'aria-label'?: string
}

interface AsAnchor extends CommonProps {
  href: string
  type?: undefined
  onClick?: MouseEventHandler<HTMLAnchorElement>
  disabled?: undefined
}

interface AsButton extends CommonProps {
  href?: undefined
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export type ButtonProps = AsAnchor | AsButton

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full border-0 px-7 py-3 text-sm md:text-base font-medium transition-opacity duration-200 hover:opacity-85 focus-visible:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#051A24] text-white shadow-btn-primary',
  secondary: 'bg-white text-[#051A24] shadow-btn-secondary',
}

function isAnchorProps(props: ButtonProps): props is AsAnchor {
  return typeof props.href === 'string'
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props
  const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')
  const ariaLabel = props['aria-label']

  if (isAnchorProps(props)) {
    const isExternal = /^https?:\/\//.test(props.href)
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={ariaLabel}
        onClick={props.onClick}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      aria-label={ariaLabel}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  )
}
