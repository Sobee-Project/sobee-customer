import { APP_ROUTES } from "@/_constants"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Logo = () => {
  const { theme } = useTheme()
  const isLight = theme === "light"
  return (
    <Link href={APP_ROUTES.HOME}>
      <Image src={isLight ? "/logo_text_light.png" : "/logo_text_dark.png"} alt='Sobee' width={120} height={40} />
    </Link>
  )
}

export default Logo
