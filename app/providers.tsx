"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren, useState } from "react"
import { Toaster } from "react-hot-toast"
import { Socket } from "socket.io-client"
import { SOCKET_STATUS } from "./_constants"
import { SocketContext, SocketProvider } from "./_context"

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <SocketProvider>
      <NextUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <main className='dark:bg-gradient-to-br dark:from-slate-900 dark:to-black'>{children}</main>
        </NextThemesProvider>
      </NextUIProvider>
      <Toaster />
    </SocketProvider>
  )
}

export default Provider
