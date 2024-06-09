"use client"
import { cancelOrder, fetchRoomById, getReview, reOrder } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { useChatRoomSocket, useCreateChatRoomSocket } from "@/_hooks"
import { EOrderStatus } from "@/_lib/enums"
import { IOrder, IOrderItem, IProduct, IReview } from "@/_lib/interfaces"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Download, ExternalLink, MessagesSquare, RotateCw, SquareArrowUpRight, Star, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  hideExternalLink?: boolean
}

const OrderItemList = ({ order, hideExternalLink = false }: Props) => {
  const orderItems = order.orderItems as IOrderItem[]
  const { data: chatRoom, createRoom, isLoading, isError, error, isSuccess } = useCreateChatRoomSocket()
  const router = useRouter()

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

  const { execute: reOrderExecute, isExecuting: reOrderExecuting } = useAction(reOrder, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Order re-created successfully")
      } else {
        toast.error(data.message)
      }
    }
  })

  const handleCancelOrder = () => {
    execute(order._id!)
  }

  const handleReorder = () => {
    reOrderExecute(order._id!)
  }

  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError, error])

  useEffect(() => {
    if (isSuccess && chatRoom) {
      location.href = APP_ROUTES.CHAT.ID.replace(":id", chatRoom._id!)
    }
  }, [isSuccess, router, chatRoom])

  const onViewChatRoom = async () => {
    const res = await fetchRoomById(order._id!)
    if (!res.success) {
      createRoom(order._id!)
    } else {
      router.push(APP_ROUTES.CHAT.ID.replace(":id", res.data!._id!))
    }
  }

  const disabled =
    order.status === EOrderStatus.CANCELED || isExecuting || order.status !== EOrderStatus.PENDING || reOrderExecuting
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
        ) : order.status === EOrderStatus.CANCELED ? (
          <Button
            onPress={handleReorder}
            color='secondary'
            startContent={<RotateCw size={20} />}
            radius='full'
            variant='solid'
          >
            Re-order
          </Button>
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
        <Button
          radius='full'
          variant='solid'
          color='primary'
          startContent={<MessagesSquare size={20} />}
          isLoading={isLoading}
          onPress={onViewChatRoom}
        >
          Chat with Seller
        </Button>
        <Button onPress={() => toPDF()} startContent={<Download size={20} />} radius='full' variant='light'>
          Download Invoice
        </Button>
        {!hideExternalLink && (
          <Button
            radius='full'
            variant='light'
            isIconOnly
            as={Link}
            target='_blank'
            href={APP_ROUTES.ORDERS.ID.replace(":id", order._id!)}
          >
            <ExternalLink size={20} />
          </Button>
        )}
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
