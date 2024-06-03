import { IProduct } from "./IProduct"

export interface IBrand {
  _id?: string
  name: string
  logo: string
  slug: string
  isActive: boolean
  website: string
  products?: string[] | IProduct[]
  productCount?: number
  createdAt?: Date | string
  updatedAt?: Date | string
}
