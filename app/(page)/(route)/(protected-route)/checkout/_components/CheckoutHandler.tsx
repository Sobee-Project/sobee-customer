"use client"
import { createOrder } from "@/_actions"
import { EPaymentMethod } from "@/_lib/enums"
import { CreateOrderFormSchema, createOrderFormSchema } from "@/_lib/form-schema"
import { IAddress, IOrderItem, IPaymentMethod, IUser } from "@/_lib/interfaces"
import { useCartStore } from "@/_store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Divider } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CheckoutCartList } from "."
import CheckoutInfo from "./CheckoutInfo"

type Props = {
  user: IUser
  addresses: IAddress[]
}

const CheckoutHandler = ({ addresses, user }: Props) => {
  const { orderItems: cart } = useCartStore()
  const defaultAddress = addresses.find((address) => address.isDefault)
  const methods = useForm<CreateOrderFormSchema>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      shippingAddress: defaultAddress?._id,
      emailAddress: user.email,
      phoneNumber: user.phoneNumber,
      paymentMethod: EPaymentMethod.COD
    }
  })

  const { execute, status } = useAction(createOrder, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Order created successfully")
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateOrderFormSchema) => {
    console.log(data)
    execute(data)
  }

  return (
    <FormProvider {...methods}>
      {isLoading && <div className='fixed inset-0 z-50 bg-background/50' />}
      <form
        className='flex flex-col gap-8 md:flex-row'
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
          }
        }}
      >
        <CheckoutInfo user={user} addresses={addresses} />
        <Divider orientation='vertical' className='hidden h-auto min-h-80 md:block' />
        <Divider className='block md:hidden' />
        <CheckoutCartList cart={cart} />
      </form>
    </FormProvider>
  )
}

export default CheckoutHandler
