import { IAttribute } from "./IAttribute"
import { IProduct } from "./IProduct"

export interface IVariant {
  _id?: string
  assets?: string[]
  amount: number
  price: number
  size: string
  color: string
}
