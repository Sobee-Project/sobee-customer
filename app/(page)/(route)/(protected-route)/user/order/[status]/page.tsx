import { fetchAllOrders } from "@/_actions"
import { IOrder } from "@/_lib/interfaces"
import React from "react"
import OrderDetails from "../_components/OrderDetails"
import OrderList from "../_components/OrderList"

const page = async ({ searchParams }: any) => {
  let orders = [] as IOrder[]
  const orderRes = await fetchAllOrders()
  if (orderRes.success) {
    orders = orderRes.data!
  }

  return (
    <div className='hidden w-full overflow-hidden lg:flex'>
      <OrderList orders={orders} />
      <OrderDetails />
    </div>
  )
}

export default page
