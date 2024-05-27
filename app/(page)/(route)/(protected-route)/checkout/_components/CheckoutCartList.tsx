"use client"
import { CouponCard, OrderItemCard } from "@/(page)/(route)/_components"
import { applyCoupon } from "@/_actions"
import { ECouponType, EShippingType } from "@/_lib/enums"
import { CreateOrderFormSchema } from "@/_lib/form-schema"
import { ICoupon, IOrderItem, IProduct, IShipping, ITax } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { Button, Divider, Input } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  cart: IOrderItem[]
}

const CartList = ({ cart }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext<CreateOrderFormSchema>()

  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<ICoupon | null>(null)

  const subTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.subTotal || 0), 0), [cart])
  const fee = useMemo(() => {
    let sf = 0
    let tf = 0
    cart.forEach((item) => {
      const product = item.product as IProduct
      const tax = product.tax as ITax
      const shippingFee = product.shippingFee as IShipping
      sf += shippingFee.type === EShippingType.FIXED ? shippingFee.amount : shippingFee.amount * subTotal
      tf += tax.rate * subTotal
    })
    return { sf, tf }
  }, [cart, subTotal])

  const discountTotal = useMemo(() => {
    let temp = 0
    if (appliedDiscount) {
      const appliedDiscountType = appliedDiscount.type
      temp =
        appliedDiscountType === ECouponType.PERCENTAGE
          ? subTotal * appliedDiscount.discountValue
          : appliedDiscount.discountValue
    }
    return temp
  }, [appliedDiscount, subTotal])

  const total = subTotal + fee.sf + fee.tf - discountTotal
  const orderItems = cart.map((item) => item._id!)

  useEffect(() => {
    setValue("orderItems", orderItems)
  }, [setValue, orderItems])

  useEffect(() => {
    setValue("shippingFee", fee.sf)
    setValue("taxFee", fee.tf)
    setValue("total", total)
  }, [setValue, total, fee])

  const { execute: applyDiscountExecute, status: applyDiscountStatus } = useAction(applyCoupon, {
    onSuccess: ({ data }) => {
      if (data.success) {
        setValue("coupon", data.data?.code!)
        setAppliedDiscount(data.data!)
        toast.success("Coupon applied")
      } else {
        toast.error(data.message)
      }
    }
  })

  const isApplyingDiscount = applyDiscountStatus === "executing"

  const onApplyDiscount = useCallback(() => {
    applyDiscountExecute({
      code: discountCode,
      orderProducts: orderItems,
      orderValue: total
    })
  }, [discountCode, applyDiscountExecute, orderItems, total])

  return (
    <div className='space-y-4 md:max-w-[30rem]'>
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
      <Divider />
      <div className='space-y-4'>
        {appliedDiscount ? (
          <CouponCard
            coupon={appliedDiscount}
            action='apply'
            onRemove={() => {
              setAppliedDiscount(null)
            }}
          />
        ) : (
          <div className='flex w-full gap-2'>
            <Input
              labelPlacement='outside-left'
              placeholder='Discount code'
              size='lg'
              classNames={{
                mainWrapper: "w-full"
              }}
              fullWidth
              className='flex-1'
              value={discountCode}
              onValueChange={setDiscountCode}
            />
            <Button
              type='button'
              size='lg'
              variant='flat'
              onPress={onApplyDiscount}
              isLoading={isApplyingDiscount}
              isDisabled={isApplyingDiscount}
            >
              Apply
            </Button>
          </div>
        )}
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Subtotal</p>
          <p className='font-semibold'>{formatCurrency(subTotal)}</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Shipping estimate</p>
          <p className='font-semibold'>{formatCurrency(fee.sf)}</p>
        </div>
        <div className='flex items-center justify-between gap-2'>
          <p className='text-foreground-500'>Tax estimate</p>
          <p className='font-semibold'>{formatCurrency(fee.tf)}</p>
        </div>
        {appliedDiscount && (
          <div className='flex items-center justify-between gap-2'>
            <p className='text-foreground-500'>Discount</p>
            <p className='font-semibold'>-{formatCurrency(discountTotal)}</p>
          </div>
        )}
        <div className='flex items-center justify-between gap-2'>
          <p className='text-lg font-semibold'>Order total</p>
          <p className='text-lg font-semibold'>{formatCurrency(total)}</p>
        </div>
      </div>
      <Button variant='shadow' size='lg' radius='full' fullWidth color='primary' type='submit'>
        Confirm order
      </Button>
    </div>
  )
}

export default CartList
