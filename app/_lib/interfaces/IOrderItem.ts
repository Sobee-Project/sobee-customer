import { IOrder } from "./IOrder"
import { IProduct } from "./IProduct"
import { IUser } from "./IUser"
import { IVariant } from "./IVariant"

export interface IOrderItem {
  _id?: string
  product?: IProduct | string
  customer?: string | IUser
  amount: number
  price?: number
  subTotal?: number
  size?: string
  color?: string
}
