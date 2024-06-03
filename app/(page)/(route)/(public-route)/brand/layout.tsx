import { fetchAllBrands } from "@/_actions"
import { IBrand, ICategory } from "@/_lib/interfaces"
import { LayoutParamsProps } from "@/_lib/params"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { BrandLeftSide, BrandMobileNav } from "./_components"

const layout = async ({ children, params }: LayoutParamsProps) => {
  let brands = [] as IBrand[]
  const brandRes = await fetchAllBrands()
  if (brandRes.success) brands = brandRes.data!

  return (
    <div className='mx-auto px-4 py-10 md:mx-[5%]'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <aside className='sticky top-24 hidden max-h-[90vh] w-60 flex-col justify-start gap-4 self-start overflow-auto md:flex'>
          <BrandLeftSide brands={brands} paginationRes={{ ...brandRes }} />
        </aside>
        <nav className='flex w-full md:hidden'>
          <BrandMobileNav brands={brands} paginationRes={{ ...brandRes }} />
        </nav>
        <div className='flex min-h-[50vh] flex-1 flex-col gap-4 overflow-hidden rounded-md border bg-background p-4 dark:border-slate-800'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
