"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <main className='dark:bg-gradient-to-br dark:from-slate-900 dark:to-black'>{children}</main>
        </NextThemesProvider>
      </NextUIProvider>
      <Toaster />
    </>
  )
}

export default Provider
