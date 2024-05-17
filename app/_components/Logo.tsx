import { APP_ROUTES } from "@/_constants"
import { cn } from "@/_lib/utils"
import { ClassValue } from "clsx"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  className?: ClassValue
  imageClassName?: ClassValue
}

const Logo = ({ className, imageClassName }: Props) => {
  const { theme } = useTheme()
  const isLight = theme === "light"
  return (
    <Link href={APP_ROUTES.HOME} className={cn(className)}>
      <Image
        src={isLight ? "/logo_text_light.png" : "/logo_text_dark.png"}
        alt='Sobee'
        width={120}
        height={40}
        className={cn(imageClassName)}
      />
    </Link>
  )
}

export default Logo
