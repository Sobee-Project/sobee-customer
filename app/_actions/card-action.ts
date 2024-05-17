"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createCardFormSchema, deleteCardSchema, setDefaultCardSchema } from "@/_lib/form-schema"
import { ICard, IFaq } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const fetchAllCards = async () => {
  const res = await FETCH.get<ICard[]>(API_ROUTES.CARD.GET_CARDS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.CARD.GET_ALL]
    }
  })
  return res
}

export const createCard = safeAction
  .metadata({
    actionName: "Create Card"
  })
  .schema(createCardFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<ICard, ICard>(API_ROUTES.CARD.CREATE, parsedInput, { cookies })
    if (res.success) {
      revalidateTag(CACHE_KEY.CARD.GET_ALL)
    }
    return res
  })

export const setDefaultCard = safeAction
  .metadata({
    actionName: "Set Default Card"
  })
  .schema(setDefaultCardSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<
      {
        cardId: string
      },
      ICard
    >(API_ROUTES.CARD.SET_DEFAULT, parsedInput, { cookies })
    if (res.success) {
      revalidateTag(CACHE_KEY.CARD.GET_ALL)
    }
    return res
  })

export const deleteCard = safeAction
  .metadata({
    actionName: "Delete Card"
  })
  .schema(deleteCardSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<ICard>(API_ROUTES.CARD.DELETE_CARD.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.CARD.GET_ALL)
    }
    return res
  })
