"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ITerm } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchAllTerms = async () => {
  const res = await FETCH.get<ITerm[]>(API_ROUTES.TERM.GET_TERMS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.TERM.GET_ALL]
    },
    cookies
  })
  return res
}
