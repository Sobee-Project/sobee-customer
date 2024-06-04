"use client"
import { APP_ROUTES } from "@/_constants"
import { IOrderItem } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { useCartStore } from "@/_store"
import { Badge, Button, Divider, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react"
import { ChevronRight, ShoppingCart } from "lucide-react"
import Link from "next/link"
import React, { useMemo } from "react"
import OrderItemCard from "../OrderItemCard"

type Props = {}

const CartMenu = ({}: Props) => {
  const { orderItems: cart } = useCartStore()
  const subTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.subTotal || 0), 0), [cart])
  const { onOpenChange, isOpen, onClose } = useDisclosure()
  return (
    <Popover showArrow placement='bottom-end' isOpen={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Button isIconOnly variant='light' className='hidden md:inline-flex'>
          <Badge content={cart?.length || 0} color='danger'>
            <ShoppingCart size={24} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='block w-[32rem] overflow-hidden p-0'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-xl font-semibold'>Shopping cart</h2>
            <Link href={APP_ROUTES.CARTS} className='flex items-center' onClick={onClose}>
              <span className='text-primary underline'>View all</span>
              <ChevronRight size={20} className='text-primary' />
            </Link>
          </div>
          <div className='space-y-4 px-4'>
            {cart.length > 0 ? (
              cart?.slice(0, 5).map((item, index) => (
                <div key={item._id} className='space-y-4'>
                  <OrderItemCard orderItem={item} hideQuantity />
                  {index < cart.length - 1 && <Divider />}
                </div>
              ))
            ) : (
              <p className='text-foreground-500'>Cart is empty</p>
            )}
            {cart.length > 5 && (
              <Link href={APP_ROUTES.CARTS} className='my-2 block text-center' onClick={onClose}>
                And more...
              </Link>
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
              <Button
                variant='light'
                className='flex-1'
                radius='full'
                size='lg'
                as={Link}
                href={APP_ROUTES.CARTS}
                onClick={onClose}
              >
                View cart
              </Button>
              <Button
                color='primary'
                className='flex-1'
                radius='full'
                size='lg'
                as={Link}
                href={APP_ROUTES.CHECKOUT}
                onClick={onClose}
              >
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
