import { z } from "zod"

export const createOrderItemFormSchema = z.object({
  product: z.string(),
  amount: z.number(),
  color: z.string().optional(),
  size: z.string().optional()
})

export type CreateOrderItemFormSchema = z.infer<typeof createOrderItemFormSchema>

export const removeOrderItemFormSchema = z.string()

export const updateOrderItemQuantityFormSchema = z.object({
  _id: z.string(),
  quantity: z.number()
})

export type UpdateOrderItemQuantityFormSchema = z.infer<typeof updateOrderItemQuantityFormSchema>

export const createOrderFormSchema = z.object({
  orderItems: z.array(z.string()),
  shippingFee: z.number(),
  taxFee: z.number().optional(),
  total: z.number(),
  paymentMethod: z.string(),
  shippingAddress: z.string(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string().optional(),
  note: z.string().optional(),
  coupon: z.string().optional()
})

export type CreateOrderFormSchema = z.infer<typeof createOrderFormSchema>
