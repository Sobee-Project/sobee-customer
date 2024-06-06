import { fetchAllCategories } from "@/_actions"
import { ICategory } from "@/_lib/interfaces"
import { LayoutParamsProps } from "@/_lib/params"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { CategoryLeftSide, CategoryMobileNav } from "./_components"

const layout = async ({ children, params }: LayoutParamsProps) => {
  let categories = [] as ICategory[]
  const categoryRes = await fetchAllCategories()
  if (categoryRes.success) categories = categoryRes.data!

  return (
    <div className='mx-auto px-4 py-10 md:mx-[5%]'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <aside className='sticky top-24 hidden max-h-[80vh] w-60 flex-col justify-start gap-4 self-start overflow-auto scrollbar-thin md:flex'>
          <CategoryLeftSide categories={categories} />
        </aside>
        <nav className='flex w-full md:hidden'>
          <CategoryMobileNav categories={categories} />
        </nav>
        <div className='flex min-h-[50vh] flex-1 flex-col gap-4 overflow-hidden rounded-md border bg-background p-4 dark:border-slate-800'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
