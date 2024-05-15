import type { Metadata } from "next"
import { Teachers } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Teachers({
  subsets: ["latin"],
  fallback: ["sans-serif", "system-ui", "ui-sans-serif"]
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
