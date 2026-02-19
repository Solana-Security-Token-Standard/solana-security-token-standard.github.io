import Image from 'next/image'

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
      className={className}
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
      className={className}
      priority
    />
  )
}
