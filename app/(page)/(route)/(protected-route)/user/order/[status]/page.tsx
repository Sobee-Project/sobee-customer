import { fetchAllOrders } from "@/_actions"
import { redirect } from "next/navigation"
import React from "react"
import OrderList from "./_components/OrderList"

const page = async () => {
  return (
    <div>
      <OrderList />
    </div>
  )
}

export default page
