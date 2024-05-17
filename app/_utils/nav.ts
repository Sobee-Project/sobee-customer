export const isNavActive = (href: string, pathname: string) => {
  if (href === "/" && pathname === "/") return true
  return href !== "/" && pathname.includes(href)
}

export const disabledNavKeys = (
  keys: {
    href: string
    title: string
  }[],
  pathname: string
) => keys.map((r) => r.href).filter((v) => isNavActive(v, pathname))
