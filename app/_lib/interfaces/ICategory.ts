import { IProduct } from "./IProduct"

export interface ICategory {
  _id?: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount?: number
  products?: IProduct[]
  parent: null | string | ICategory
  children: string[] | ICategory[]
}
