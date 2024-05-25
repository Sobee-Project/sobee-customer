import { IProduct } from "./IProduct"
import { IReply } from "./IReply"
import { IUser } from "./IUser"

export interface IReview {
  _id?: string
  product?: string | IProduct
  customer?: string | IUser
  rating: number
  content: string
  assets: string[]
  reply?: IReply
  likes?: string[]
  createdAt?: string
  updatedAt?: string
}
