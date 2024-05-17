import { LayoutParamsProps } from "@/_lib/params"
import React from "react"
import { UserLeftSide, UserTabBarMobile } from "./_components"

const layout = ({ children, params }: LayoutParamsProps) => {
  return (
    <div className='mx-auto px-4 py-10 md:mx-[10%]'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <aside className='hidden w-48 flex-col gap-4 self-start md:flex'>
          <UserLeftSide />
        </aside>
        <nav className='flex w-full justify-end md:hidden'>
          <UserTabBarMobile />
        </nav>
        <div className='flex min-h-[50vh] flex-1 flex-col gap-4 rounded-md border bg-background p-4 dark:border-slate-800'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
