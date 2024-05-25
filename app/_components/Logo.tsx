"use client"
import { APP_ROUTES } from "@/_constants"
import { cn } from "@/_lib/utils"
import { ClassValue } from "clsx"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

type Props = {
  className?: ClassValue
  imageClassName?: ClassValue
}

const Logo = ({ className, imageClassName }: Props) => {
  const { theme } = useTheme()
  const isLight = theme === "light"
  const [source, setSource] = useState<string>("/logo_text_light.png")
  useEffect(() => {
    setSource(isLight ? "/logo_text_light.png" : "/logo_text_dark.png")
  }, [isLight, theme])

  return (
    <Link href={APP_ROUTES.HOME} className={cn(className)}>
      <Image src={source} alt='Sobee' width={120} height={40} className={cn("h-auto w-auto", imageClassName)} />
    </Link>
  )
}

export default Logo
