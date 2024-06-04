"use client"
import { APP_ROUTES } from "@/_constants"
import { EShippingType } from "@/_lib/enums"
import { IOrderItem, IProduct, IShipping, ITax } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { useCartStore } from "@/_store"
import { Button, Divider } from "@nextui-org/react"
import Link from "next/link"
import React, { useMemo } from "react"

type Props = {}

const Checkout = ({}: Props) => {
  const { orderItems: cart } = useCartStore()

  const subTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.subTotal || 0), 0), [cart])
  const fee = useMemo(() => {
    let sf = 0
    let tf = 0
    cart.forEach((item) => {
      const product = item.product as IProduct
      const tax = product.tax as ITax
      const shippingFee = product.shippingFee as IShipping
      if (!tax || !shippingFee) return
      sf += shippingFee.type === EShippingType.FIXED ? shippingFee.amount : shippingFee.amount * subTotal
      tf += tax.rate * subTotal
    })
    return { sf, tf }
  }, [cart, subTotal])

  const total = subTotal + fee.sf + fee.tf

  return (
    <div className='w-full space-y-8 self-start md:sticky md:top-28 md:max-w-72 lg:max-w-80'>
      <h3 className='text-lg font-semibold'>Order summary</h3>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Subtotal</p>
          <p className='font-semibold'>{formatCurrency(subTotal)}</p>
        </div>
        <Divider />
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Shipping estimate</p>
          <p className='font-semibold'>{formatCurrency(fee.sf)}</p>
        </div>
        <Divider />
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Tax estimate</p>
          <p className='font-semibold'>{formatCurrency(fee.tf)}</p>
        </div>
        <Divider />
        <div className='flex items-center justify-between gap-2'>
          <p className='text-lg font-semibold'>Order total</p>
          <p className='text-lg font-semibold'>{formatCurrency(total)}</p>
        </div>
      </div>
      <Button variant='shadow' size='lg' radius='full' fullWidth color='primary' as={Link} href={APP_ROUTES.CHECKOUT}>
        Checkout
      </Button>
    </div>
  )
}

export default Checkout
