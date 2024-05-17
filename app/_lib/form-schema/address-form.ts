import { z } from "zod"

export const createAddressFormSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  specificAddress: z.string().min(1),
  isDefault: z.boolean().optional().default(false)
})

export const updateAddressFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createAddressFormSchema)

export const deleteAddressFormSchema = z.string()

export const setDefaultAddressFormSchema = z.object({
  addressId: z.string()
})

export type CreateAddressFormSchema = z.infer<typeof createAddressFormSchema>
export type UpdateAddressFormSchema = z.infer<typeof updateAddressFormSchema>
export type DeleteAddressFormSchema = z.infer<typeof deleteAddressFormSchema>
