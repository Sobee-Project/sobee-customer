import { ECouponApplyType, ECouponStatus, ECouponType } from "@/_lib/enums"
import { ICustomer } from "./ICustomer"
import { IProduct } from "./IProduct"

export interface ICoupon {
  _id?: string
  code: string
  image: string
  type: ECouponType
  discountValue: number
  minOrderValue: number
  startDate: string
  endDate: string
  usageLimit: number
  usageCount: number
  customerUsed: string[] | ICustomer[]
  status: ECouponStatus
  applyTo: ECouponApplyType
  productApply: string[] | IProduct[]
  createdAt?: string
}
