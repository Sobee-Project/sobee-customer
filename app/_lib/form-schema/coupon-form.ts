import { z } from "zod"

export const validateCouponFormSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  orderProducts: z.array(z.string()),
  orderValue: z.number().min(1, "Order value is required")
})

export type ValidateCouponFormSchema = z.infer<typeof validateCouponFormSchema>
