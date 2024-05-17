import { z } from "zod"

export const createPaymentAccountFormSchema = z.object({
  accountNumber: z.string().min(1),
  bankName: z.string().min(1),
  accountHolderName: z.string().min(1),
  isDefault: z.boolean().optional().default(false)
})

export const setDefaultPaymentAccountSchema = z.object({
  paymentAccountId: z.string()
})

export const deletePaymentAccountSchema = z.string()

export type CreatePaymentAccountFormSchema = z.infer<typeof createPaymentAccountFormSchema>
