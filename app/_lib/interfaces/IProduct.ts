import { EProductStatus, EProductType } from "@/_lib/enums"
import { IBrand } from "./IBrand"
import { ICategory } from "./ICategory"
import { IShipping } from "./IShipping"
import { ITax } from "./ITax"
import { IVariant } from "./IVariant"

export interface IProduct {
  _id?: string
  category: ICategory | string
  name: string
  slug?: string
  shortDescription?: string
  description: string
  displayPrice: number
  minPrice?: number
  maxPrice?: number
  brand?: string | IBrand
  tax?: string | ITax
  shippingFee?: string | IShipping
  discount?: number
  type?: EProductType | string
  thumbnail: string
  quantity: number
  sold?: number
  status?: EProductStatus
  favoritesBy?: string[]
  variants?: IVariant[]
  ratingCount?: number
  ratingValue?: number
  isFeatured?: boolean
  isDraft?: boolean
  isDiscount?: boolean
  isVariation?: boolean
  deletedAt?: string
  createdAt?: string
  updatedAt?: string
}
