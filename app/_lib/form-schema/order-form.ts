import { z } from "zod"

export const createOrderItemFormSchema = z.object({
  product: z.string(),
  amount: z.number(),
  color: z.string().optional(),
  size: z.string().optional()
})

export type CreateOrderItemFormSchema = z.infer<typeof createOrderItemFormSchema>
