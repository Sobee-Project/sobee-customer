import type { Metadata } from "next"
import { Teachers } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Teachers({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Sobee Shop",
  description: "Sobee Shop"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
