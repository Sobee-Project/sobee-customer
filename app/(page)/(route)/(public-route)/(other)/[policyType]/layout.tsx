import { LayoutParamsProps } from "@/_lib/params"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import React from "react"
import { Breadcrumber } from "./_components"

const layout = ({ params, children }: LayoutParamsProps) => {
  const { policyType } = params
  const routes = [
    {
      href: "/",
      title: "Home"
    },
    {
      href: policyType,
      title: policyType.replace(/-/g, " ")
    }
  ]
  return (
    <div>
      <div className='flex w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-300 py-20 md:min-h-60 lg:min-h-80'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-center text-xl font-bold uppercase md:text-3xl'>{policyType.replace(/-/g, " ")}</h1>
          <Breadcrumber routes={routes} />
        </div>
      </div>
      <div className='mx-auto w-full max-w-screen-lg px-4 py-10'>{children}</div>
    </div>
  )
}

export default layout
