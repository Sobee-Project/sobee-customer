"use client"
import { APP_ROUTES, HttpStatusCode } from "@/_constants"
import { LayoutParamsProps } from "@/_lib/params"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { usePathname } from "next/navigation"
import React from "react"
import titleize from "titleize"

const Layout = ({ children }: LayoutParamsProps) => {
  const pathname = usePathname()
  const title = titleize(pathname.replace(/[/\-]/g, " ").trim())

  return (
    <div>
      <div className='flex w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-300 py-20 dark:from-slate-900 dark:to-black md:min-h-60 lg:min-h-80'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-center text-xl font-bold uppercase md:text-3xl'>{title}</h1>
          <Breadcrumbs size='lg'>
            <BreadcrumbItem href={APP_ROUTES.HOME}>Home</BreadcrumbItem>
            <BreadcrumbItem href={pathname}>{pathname === "/faq" ? "FAQ" : titleize(title)}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div className='mx-auto w-full max-w-screen-lg px-4 py-10'>{children}</div>
    </div>
  )
}

export default Layout
