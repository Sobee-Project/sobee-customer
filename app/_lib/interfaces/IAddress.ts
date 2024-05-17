import { IUser } from "./IUser"

export interface IAddress {
  _id?: string
  name: string
  phoneNumber: string
  country: string
  city: string
  district: string
  ward: string
  specificAddress: string
  isDefault: boolean
  customer?: string | IUser
  createdAt?: Date | string
  updatedAt?: Date | string
}
