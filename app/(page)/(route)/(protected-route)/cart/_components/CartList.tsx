"use client"
import { OrderItemCard } from "@/(page)/(route)/_components"
import { IOrderItem } from "@/_lib/interfaces"
import { useCartStore } from "@/_store"
import { Divider } from "@nextui-org/react"
import React from "react"

type Props = {}

const CartList = ({}: Props) => {
  const { orderItems: cart } = useCartStore()
  return (
    <div className='flex-1 space-y-4'>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={item._id} className='space-y-4'>
            <OrderItemCard orderItem={item} />
            {index < cart.length - 1 && <Divider />}
          </div>
        ))
      ) : (
        <p className='text-foreground-500'>Cart is empty</p>
      )}
    </div>
  )
}

export default CartList
