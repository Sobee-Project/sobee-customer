import { getCurrentUser } from "@/_actions"
import { LayoutParamsProps } from "@/_lib/params"
import { redirect } from "next/navigation"
import React from "react"

export const dynamic = "force-dynamic"

const layout = async ({ children }: LayoutParamsProps) => {
  const res = await getCurrentUser()
  if (!res.data?.success) {
    redirect("/" + (res.data?.statusCode || 401))
  }
  return <div>{children}</div>
}

export default layout
