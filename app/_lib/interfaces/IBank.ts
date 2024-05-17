import { IUser } from "./IUser"

export interface ICard {
  _id?: string
  cardNumber: string
  cardHolderName: string
  expiryDate: string
  cvv: string
  isDefault?: boolean
  postalCode: string
  cardBrand: string
  customer?: string | IUser
}

export interface IPaymentAccount {
  _id?: string
  accountNumber: string
  accountHolderName: string
  bankName: string
  isDefault?: boolean
  customer?: string | IUser
}

export interface IBank {
  id: number
  name: string
  code: string
  bin: string
  shortName: string
  logo: string
  transferSupported: number
  lookupSupported: number
  short_name: string
  support: number
  isTransfer: number
  swift_code: string
}
