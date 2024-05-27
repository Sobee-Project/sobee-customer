"use client"
import { removeOrderItem, updateOrderItemQuantity } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IOrderItem, IProduct } from "@/_lib/interfaces"
import { cn, formatCurrency } from "@/_lib/utils"
import { productInitialState, productReducer } from "@/_reducer"
import { Button, Chip, Divider, Input } from "@nextui-org/react"
import { Minus, Plus } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useEffect, useReducer } from "react"
import toast from "react-hot-toast"

type Props = {
  orderItem: IOrderItem
  hideQuantity?: boolean
}

const OrderItemCard = ({ orderItem, hideQuantity = false }: Props) => {
  const product = orderItem.product as IProduct
  const [{ quantity }, dispatch] = useReducer(productReducer, productInitialState)

  useEffect(() => {
    dispatch({
      type: "SET_QUANTITY",
      payload: orderItem.amount
    })
  }, [orderItem])

  const { execute: removeOrderItemExecute, status: removeOrderItemStatus } = useAction(removeOrderItem, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Item removed from cart")
      } else {
        toast.error(data.message)
      }
    }
  })

  const { execute: updateOrderItemQuantityExecute, status: updateOrderItemStatus } = useAction(
    updateOrderItemQuantity,
    {
      onSuccess: ({ data }) => {
        if (data.success) {
          toast.success("Quantity updated")
        } else {
          toast.error(data.message)
        }
      }
    }
  )

  const isRemoving = removeOrderItemStatus === "executing"
  const isUpdating = updateOrderItemStatus === "executing"

  const handleRemoveOrderItem = () => {
    removeOrderItemExecute(orderItem._id!)
  }

  const onChangeQuantity = useCallback(
    (q: number) => {
      updateOrderItemQuantityExecute({
        _id: orderItem._id!,
        quantity: q
      })
    },
    [orderItem._id, updateOrderItemQuantityExecute]
  )

  return (
    <div className='flex gap-4'>
      <div className='grid w-24 place-items-center rounded-lg bg-slate-100 p-2 dark:bg-slate-700'>
        <Image src={product.thumbnail} alt={product.name} width={100} height={100} className='w-full object-contain' />
      </div>
      <div className='flex-1'>
        <div className='flex h-full flex-wrap gap-2'>
          <div className='flex flex-1 flex-col flex-wrap justify-between space-y-1'>
            <Link
              href={APP_ROUTES.PRODUCTS.ID.replace(":id", product.slug || product._id!)}
              className='line-clamp-2 w-fit'
            >
              <h3 className='font-medium'>
                <span className='text-warning-500'>
                  {product.isDiscount ? `[-${(product.discount || 0) * 100}%] ` : " "}
                </span>
                {product.name}
              </h3>
            </Link>
            {product.isVariation && (
              <div className='flex items-center gap-2'>
                <div
                  className='h-4 w-8 rounded-full'
                  style={{
                    backgroundColor: orderItem.color
                  }}
                />
                <Divider orientation='vertical' className='h-4' />
                <p className='font-medium'>{orderItem.size}</p>
              </div>
            )}
            <p className='text-lg font-medium text-primary'>{formatCurrency(orderItem.subTotal)}</p>
            <p>Quantity: {orderItem.amount}</p>
          </div>
          <div className={cn("flex flex-col", hideQuantity ? "justify-end" : "justify-between")}>
            {!hideQuantity && (
              <div className='flex items-center gap-1 self-start'>
                <Button
                  type='button'
                  isIconOnly
                  size='sm'
                  variant='light'
                  onPress={() => {
                    dispatch({
                      type: "SET_QUANTITY",
                      payload: quantity - 1
                    })
                    onChangeQuantity(quantity - 1)
                  }}
                  isDisabled={quantity <= 1 || isUpdating || isRemoving}
                >
                  <Minus size={16} />
                </Button>
                <Input
                  className='w-10'
                  placeholder='1'
                  classNames={{
                    input: "text-center"
                  }}
                  value={quantity.toString()}
                  onValueChange={(v) => {
                    dispatch({
                      type: "SET_QUANTITY",
                      payload: Number(v)
                    })
                    onChangeQuantity(quantity)
                  }}
                  isDisabled={isUpdating || isRemoving}
                />
                <Button
                  type='button'
                  isIconOnly
                  size='sm'
                  variant='light'
                  onPress={() => {
                    dispatch({
                      type: "SET_QUANTITY",
                      payload: quantity + 1
                    })
                    onChangeQuantity(quantity + 1)
                  }}
                  isDisabled={quantity >= product.quantity || isUpdating || isRemoving}
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
            <button
              type='button'
              className={cn(
                "text-danger-500 transition-colors hover:text-danger-300",
                isRemoving || isUpdating ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )}
              onClick={handleRemoveOrderItem}
              disabled={isRemoving || isUpdating}
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItemCard