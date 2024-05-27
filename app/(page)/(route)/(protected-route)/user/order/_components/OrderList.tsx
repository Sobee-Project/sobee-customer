"use client"
import { IOrder } from "@/_lib/interfaces"
import { useEffect, useState } from "react"
import OrderCard from "./OrderCard"

type Props = {
  orders: IOrder[]
}

const OrderList = ({ orders }: Props) => {
  const [activeOrder, setActiveOrder] = useState<IOrder | null>(null)

  useEffect(() => {
    if (orders.length > 0) setActiveOrder(orders[0])
  }, [orders])

  return (
    <div className='h-[80vh] min-h-[670px] w-full pr-5 md:w-1/3 md:shrink-0 lg:pr-8 '>
      <div className='flex h-full flex-col rounded pb-5 md:border md:border-gray-200'>
        <h3 className='p-5 text-xl font-semibold '>My Orders</h3>
        <div className='w-full overflow-auto scrollbar scrollbar-w-1' style={{ height: "calc(100% - 80px)" }}>
          <div className='px-5'>
            {orders.map((order, index) => (
              <OrderCard
                key={order._id}
                order={order}
                isActive={order._id === activeOrder?._id}
                onClick={() => setActiveOrder(order)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderList
