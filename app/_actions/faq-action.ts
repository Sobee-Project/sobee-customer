"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IFaq } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchAllFaqs = async () => {
  const res = await FETCH.get<IFaq[]>(API_ROUTES.FAQ.GET_FAQS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.FAQ.GET_ALL]
    },
    cookies
  })
  return res
}
