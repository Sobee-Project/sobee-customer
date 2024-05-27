"use client"
import { APP_ROUTES } from "@/_constants"
import { IOrderItem } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import React, { useMemo } from "react"
import OrderItemCard from "../OrderItemCard"

type Props = {
  cart: IOrderItem[]
}

const CartMenu = ({ cart }: Props) => {
  const subTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.subTotal || 0), 0), [cart])
  return (
    <Popover showArrow placement='bottom-end'>
      <PopoverTrigger>
        <Button isIconOnly variant='light' className='hidden md:inline-flex'>
          <ShoppingCart size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='block min-w-96 overflow-hidden p-0'>
        <div className='space-y-2'>
          <h2 className='p-4 text-xl font-semibold'>Shopping cart</h2>
          <div className='space-y-4 px-4'>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={item._id} className='space-y-4'>
                  <OrderItemCard orderItem={item} hideQuantity />
                  {index < cart.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <p className='text-foreground-500'>Cart is empty</p>
            )}
          </div>
          <div className='space-y-2 overflow-hidden bg-slate-50 p-4 dark:bg-slate-900'>
            <div className='flex justify-between gap-4'>
              <div className='flex-1'>
                <h4 className='text-lg font-semibold'>Subtotal</h4>
                <p className='text-sm text-foreground-500'>Shipping and taxes calculated at checkout.</p>
              </div>
              <h3 className='text-lg font-semibold'>{formatCurrency(subTotal)}</h3>
            </div>
            <div className='flex gap-4 py-2'>
              <Button variant='light' className='flex-1' radius='full' size='lg' as={Link} href={APP_ROUTES.CARTS}>
                View cart
              </Button>
              <Button color='primary' className='flex-1' radius='full' size='lg' as={Link} href={APP_ROUTES.CHECKOUT}>
                Check out
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CartMenu
