import { IOrder } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { colorizeOrderStatus } from "@/_utils"
import { Divider } from "@nextui-org/react"
import React from "react"
import OrderItemList from "./OrderItemList"
import StatusTracking from "./StatusTracking"

type Props = {
  order: IOrder
}

const OrderCard = ({ order }: Props) => {
  return (
    <div>
      <StatusTracking status={order.status} />
      <div className='mt-20'>
        <Divider className='mb-10' />
        <OrderItemList order={order} />
      </div>
    </div>
  )
}

export default OrderCard
