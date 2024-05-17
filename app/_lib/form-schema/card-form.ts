import { z } from "zod"

export const createCardFormSchema = z.object({
  cardNumber: z.string().min(1),
  cardHolderName: z.string().min(1),
  expiryDate: z.string().min(5).max(5),
  cvv: z.string().min(3).max(4),
  postalCode: z.string().min(6).max(6),
  cardBrand: z.string().min(1),
  isDefault: z.boolean().optional().default(false)
})

export const setDefaultCardSchema = z.object({
  cardId: z.string()
})

export const deleteCardSchema = z.string()

export type CreateCardFormSchema = z.infer<typeof createCardFormSchema>
