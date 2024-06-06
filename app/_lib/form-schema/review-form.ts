import { z } from "zod"

export const createReviewformSchema = z.object({
  product: z.string(),
  rating: z.number().int().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  content: z.string().min(1, "Review content is required"),
  assets: z.array(z.string()).optional()
})

export type CreateReviewFormSchema = z.infer<typeof createReviewformSchema>

export const editReviewformSchema = z
  .object({
    _id: z.string()
  })
  .merge(createReviewformSchema)

export type EditReviewFormSchema = z.infer<typeof editReviewformSchema>
