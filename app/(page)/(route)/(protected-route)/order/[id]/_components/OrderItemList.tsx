"use client"
import { EOrderStatus } from "@/_lib/enums"
import { IOrder } from "@/_lib/interfaces"
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react"
import { Download } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import toast from "react-hot-toast"
import { Resolution, usePDF } from "react-to-pdf"
import Invoice from "./Invoice"

type Props = {
  order: IOrder
}

const OrderItemList = ({ order }: Props) => {
  const { toPDF, targetRef } = usePDF({
    page: {
      margin: 10
    },
    filename: `order-${order.orderGeneratedId}.pdf`
  })
  const statuses = Object.values(EOrderStatus)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end gap-4'>
        <Button onPress={() => toPDF()} startContent={<Download size={20} />} radius='full' variant='light'>
          Download Invoice
        </Button>
      </div>
      <Invoice order={order} ref={targetRef} />
    </div>
  )
}

export default OrderItemList
