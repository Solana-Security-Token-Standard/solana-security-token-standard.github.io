import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'rounded-full bg-[#00A8A8] py-2 px-4 text-sm font-semibold text-white hover:bg-[#008f8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A8A8]/50 active:bg-[#007b7b]',
  secondary:
    'rounded-full bg-[#2A2D6E] py-2 px-4 text-sm font-medium text-white hover:bg-[#23265c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-300',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(variantStyles[variant], className)

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
