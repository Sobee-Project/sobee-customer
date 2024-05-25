import { z } from "zod"

export const createQuestionFormSchema = z.object({
  content: z.string().min(10).max(500),
  product: z.string()
})

export const editQuestionFormSchema = z.object({
  content: z.string().min(10).max(500),
  _id: z.string()
})

export type CreateQuestionForm = z.infer<typeof createQuestionFormSchema>
export type EditQuestionForm = z.infer<typeof editQuestionFormSchema>

export const deleteQuestionFormSchema = z.string()

export const likeQuestionFormSchema = z.string()
export const likeReplyFormSchema = z.string()
