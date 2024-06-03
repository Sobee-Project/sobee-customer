import type { Metadata } from "next"
import { CookiesProvider } from "next-client-cookies/server"
import { Poppins } from "next/font/google"
import "react-photo-view/dist/react-photo-view.css"
import "swiper/css"
import "swiper/css/pagination"
import "./globals.css"
import Providers from "./providers"

const inter = Poppins({
  subsets: ["latin"],
  fallback: ["sans-serif", "system-ui", "ui-sans-serif"],
  weight: ["400", "500", "600", "700", "800", "900"]
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
    <CookiesProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </CookiesProvider>
  )
}
