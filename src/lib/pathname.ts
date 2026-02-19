export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname) {
    return '/'
  }

  let normalized = pathname.split('#')[0]?.split('?')[0] ?? '/'

  normalized = normalized.replace(/\/index\.html$/, '/')
  normalized = normalized.replace(/\.html$/, '')

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }

  return normalized || '/'
}

export function pathsMatch(
  left: string | null | undefined,
  right: string | null | undefined,
): boolean {
  return normalizePathname(left) === normalizePathname(right)
}
