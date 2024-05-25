import { getCurrentUser } from "@/_actions"
import { LayoutParamsProps } from "@/_lib/params"
import { redirect } from "next/navigation"
import React from "react"

const layout = async ({ children }: LayoutParamsProps) => {
  const res = await getCurrentUser()
  if (!res.success) {
    redirect("/" + (res.statusCode || 401))
  }
  return <div>{children}</div>
}

export default layout
