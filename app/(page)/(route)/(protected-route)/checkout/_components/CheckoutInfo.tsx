"use client"
import { APP_ROUTES } from "@/_constants"
import { EPaymentMethod } from "@/_lib/enums"
import { CreateOrderFormSchema } from "@/_lib/form-schema"
import { IAddress, IPaymentMethod, IUser } from "@/_lib/interfaces"
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  Tabs
} from "@nextui-org/react"
import { ContactRound, CreditCard, Truck } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useFormContext } from "react-hook-form"

type Props = {
  user: IUser
  addresses: IAddress[]
}

const CheckoutInfo = ({ addresses, user }: Props) => {
  const {
    formState: { errors },
    register,
    watch,
    setValue
  } = useFormContext<CreateOrderFormSchema>()

  const RenderAddress = (address: IAddress) => {
    return (
      <div>
        <h3 className='text-lg font-semibold'>
          {address.name}
          {address.isDefault && ` - Default`}
        </h3>
        <p className='text-sm text-foreground-500'>Country: {address.country}</p>
        <p className='text-sm text-foreground-500'>City: {address.city}</p>
        <p className='text-sm text-foreground-500'>District: {address.district}</p>
        <p className='text-sm text-foreground-500'>Ward: {address.ward}</p>
        <p className='text-sm text-foreground-500'>Specific: {address.specificAddress}</p>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <Accordion
        defaultExpandedKeys={["contactInformation", "shippingAddress", "paymentMethod"]}
        selectionMode='multiple'
      >
        <AccordionItem
          title={
            <div>
              <h3 className='text-lg font-semibold'>CONTACT INFORMATION</h3>
              <p className='text-sm text-foreground-500'>{user.name}</p>
              <p className='text-sm text-foreground-500'>
                {user.email} - {user.phoneNumber}
              </p>
            </div>
          }
          startContent={<ContactRound size={40} strokeWidth={1} />}
          key={"contactInformation"}
        >
          <div className='space-y-8'>
            <Input
              {...register("phoneNumber")}
              labelPlacement='outside'
              label='Phone Number'
              placeholder='Phone Number'
              isInvalid={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              type='tel'
            />
            <Input
              {...register("emailAddress")}
              labelPlacement='outside'
              label='Email'
              placeholder='Email'
              isInvalid={!!errors.emailAddress}
              errorMessage={errors.emailAddress?.message}
              type='email'
            />
          </div>
        </AccordionItem>
        <AccordionItem
          title={<h3 className='text-lg font-semibold'>SHIPPING ADDRESS</h3>}
          startContent={<Truck size={40} strokeWidth={1} />}
          key={"shippingAddress"}
        >
          {addresses.length > 0 ? (
            <Select
              {...register("shippingAddress")}
              labelPlacement='outside'
              placeholder='Select Address'
              items={addresses}
              showScrollIndicators={false}
              classNames={{
                trigger: "h-40"
              }}
              renderValue={(items) => items.map((item) => <RenderAddress {...item.data!} key={item.key} />)}
            >
              {(address) => (
                <SelectItem key={address._id!} value={address._id}>
                  <RenderAddress {...address} />
                </SelectItem>
              )}
            </Select>
          ) : (
            <p className='text-foreground-500'>
              No address found. Create one
              <Link href={APP_ROUTES.USER.ACCOUNT.ADDRESS} className='font-medium text-primary underline'>
                here
              </Link>
            </p>
          )}
        </AccordionItem>
        <AccordionItem
          title={<h3 className='text-lg font-semibold'>PAYMENT METHOD</h3>}
          startContent={<CreditCard size={40} strokeWidth={1} />}
          key={"paymentMethod"}
        >
          <RadioGroup {...register("paymentMethod")} value={watch("paymentMethod")}>
            <Radio value={EPaymentMethod.COD} description='Pay when you receive the product.'>
              Cash on delivery
            </Radio>
          </RadioGroup>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default CheckoutInfo
