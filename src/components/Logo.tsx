import Image from 'next/image'
import clsx from 'clsx'

type LogoProps = {
  className?: string
}

export function Logomark({ className }: LogoProps) {
  return (
    <Image
      src="/brand/ssts.svg"
      alt=""
      width={536}
      height={145}
      className={clsx(className, 'dark:brightness-0 dark:invert')}
      priority
    />
  )
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/brand/ssts.svg"
      alt=""
      width={536}
      height={145}
      className={clsx(className, 'dark:brightness-0 dark:invert')}
      priority
    />
  )
}
