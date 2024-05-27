import { EOrderStatus } from "@/_lib/enums"
import { IAddress } from "./IAddress"
import { ICoupon } from "./ICoupon"
import { ICustomer } from "./ICustomer"
import { IOrderItem } from "./IOrderItem"
import { IPaymentMethod } from "./IPaymentMethod"

export interface IOrder {
  _id?: string
  orderGeneratedId: string
  orderItems: IOrderItem[] | string[]
  customer: ICustomer | string
  status: EOrderStatus
  shippingFee: number
  taxFee?: number
  total: number
  paymentMethod?: string | IPaymentMethod
  shippingAddress: IAddress | string
  phoneNumber?: string
  emailAdress?: string
  note?: string
  coupon: string | ICoupon
  canceledAt?: Date | string
  deliveredAt?: Date | string
  completedAt?: Date | string
  createdAt?: Date | string
  updatedAt?: Date | string
}
