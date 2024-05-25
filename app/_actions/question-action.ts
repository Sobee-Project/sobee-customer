"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import {
  CreateQuestionForm,
  EditQuestionForm,
  createQuestionFormSchema,
  deleteQuestionFormSchema,
  editQuestionFormSchema,
  likeQuestionFormSchema,
  likeReplyFormSchema
} from "@/_lib/form-schema"
import { IQuestion } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchProductQuestions = async (productId: string) => {
  const res = await FETCH.get<IQuestion[]>(API_ROUTES.QUESTION.GET_PRODUCT_QUESTIONS.replace(":id", productId), {
    next: {
      tags: [[CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, productId].join(",")]
    },
    cookies
  })
  return res
}

export const createQuestion = safeAction
  .metadata({
    actionName: "Create Question"
  })
  .schema(createQuestionFormSchema)
  .action(async ({ parsedInput: question }) => {
    const res = await FETCH.post<IQuestion>(API_ROUTES.QUESTION.CREATE_QUESTION, question, {
      cookies
    })
    if (res.success) {
      revalidateTag([CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, question.product].join(","))
    }
    return res
  })

export const editQuestion = safeAction
  .metadata({
    actionName: "Edit Question"
  })
  .schema(editQuestionFormSchema)
  .action(async ({ parsedInput: question }) => {
    const res = await FETCH.put<EditQuestionForm, IQuestion>(
      API_ROUTES.QUESTION.UPDATE_QUESTION.replace(":id", question._id),
      question,
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag([CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, res.data?.product].join(","))
    }
    return res
  })

export const likeQuestion = safeAction
  .metadata({
    actionName: "Like Question"
  })
  .schema(likeQuestionFormSchema)
  .action(async ({ parsedInput: questionId }) => {
    const res = await FETCH.put<any, IQuestion>(
      API_ROUTES.QUESTION.LIKE_QUESTION.replace(":id", questionId),
      undefined,
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag([CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, res.data!.product].join(","))
    }
    return res
  })

export const likeQuestionReply = safeAction
  .metadata({
    actionName: "Like Question Reply"
  })
  .schema(likeReplyFormSchema)
  .action(async ({ parsedInput: questionId }) => {
    const res = await FETCH.put<any, IQuestion>(
      API_ROUTES.QUESTION.LIKE_QUESTION_REPLY.replace(":id", questionId),
      undefined,
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag([CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, res.data!.product].join(","))
    }
    return res
  })

export const deleteQuestion = safeAction
  .metadata({
    actionName: "Delete Question"
  })
  .schema(deleteQuestionFormSchema)
  .action(async ({ parsedInput: questionId }) => {
    const res = await FETCH.delete<IQuestion>(API_ROUTES.QUESTION.DELETE_QUESTION.replace(":id", questionId), {
      cookies
    })
    if (res.success) {
      revalidateTag([CACHE_KEY.QUESTION.GET_PRODUCT_QUESTIONS, res.data!.product].join(","))
    }
    return res
  })
