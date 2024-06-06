"use client"
import { cancelOrder, getReview } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { EOrderStatus } from "@/_lib/enums"
import { IOrder, IOrderItem, IProduct, IReview } from "@/_lib/interfaces"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Download, Star, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { usePDF } from "react-to-pdf"
import Invoice from "./Invoice"

const ReviewForm = dynamic(() => import("@/(page)/(route)/_components/ReviewForm"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  order: IOrder
}

const OrderItemList = ({ order }: Props) => {
  const orderItems = order.orderItems as IOrderItem[]

  const { toPDF, targetRef } = usePDF({
    page: {
      margin: 10
    },
    filename: `order-${order.orderGeneratedId}.pdf`
  })

  const [showReviewForm, setShowReviewForm] = useState<null | string>(null)
  const [reviewData, setReviewData] = useState<null | IReview>(null)

  const fetchReview = async (productId: string) => {
    const data = await getReview(productId)
    if (data.success) {
      setReviewData(data.data!)
    }
  }

  const { execute, isExecuting } = useAction(cancelOrder, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Order cancelled successfully")
      } else {
        toast.error(data.message)
      }
    }
  })

  const handleCancelOrder = () => {
    execute(order._id!)
  }

  const disabled = order.status === EOrderStatus.CANCELED || isExecuting || order.status !== EOrderStatus.PENDING
  const canReview = order.status === EOrderStatus.DELIVERED || order.status === EOrderStatus.COMPLETED

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end gap-4'>
        {canReview ? (
          <Dropdown>
            <DropdownTrigger>
              <Button startContent={<Star size={20} />} color='success' radius='full' variant='solid'>
                Leave a Review
              </Button>
            </DropdownTrigger>
            <DropdownMenu topContent={<h3 className='font-semibold'>Choose product to review</h3>}>
              {orderItems.map((item) => {
                const product = item.product as IProduct
                return (
                  <DropdownItem
                    key={item._id}
                    onPress={async () => {
                      await fetchReview(product._id!)
                      setShowReviewForm(product._id!)
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={50}
                        height={50}
                        className='size-10 rounded bg-white object-contain'
                      />
                      <p className='flex-1'>{product.name}</p>
                    </div>
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            onPress={handleCancelOrder}
            color='danger'
            startContent={<X size={20} />}
            radius='full'
            variant='solid'
            isDisabled={disabled}
          >
            Cancel Order
          </Button>
        )}
        <Button onPress={() => toPDF()} startContent={<Download size={20} />} radius='full' variant='light'>
          Download Invoice
        </Button>
      </div>

      {showReviewForm && (
        <ReviewForm
          visible={!!showReviewForm}
          onClose={() => setShowReviewForm(null)}
          type={reviewData ? "edit" : "new"}
          data={
            reviewData || {
              product: showReviewForm!,
              rating: 0,
              assets: [],
              content: ""
            }
          }
        />
      )}
      <Invoice order={order} ref={targetRef} />
    </div>
  )
}

export default OrderItemList
