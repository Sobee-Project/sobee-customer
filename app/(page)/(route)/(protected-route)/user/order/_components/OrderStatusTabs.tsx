"use client"
import { API_ROUTES, APP_ROUTES } from "@/_constants"
import { EOrderStatus } from "@/_lib/enums"
import { cn } from "@/_lib/utils"
import { Tab, Tabs } from "@nextui-org/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import titleize from "titleize"

const OrderStatusTabs = () => {
  const params = useParams()
  const _status = decodeURIComponent(params?.status?.toString() || "ALL")

  return (
    <div className='flex gap-4 overflow-auto scrollbar-thin'>
      {["ALL", ...Object.values(EOrderStatus)].map((status) => (
        <Link
          key={status}
          href={APP_ROUTES.USER.ORDERS.STATUS.replace(":status", status)}
          className={cn(
            "min-w-32 border-b border-b-transparent px-4 py-2 text-center transition-colors hover:border-b-primary hover:text-primary",
            status === _status ? "border-b-primary text-primary" : "text-foreground"
          )}
        >
          {titleize(status)}
        </Link>
      ))}
    </div>
  )
}

export default OrderStatusTabs
