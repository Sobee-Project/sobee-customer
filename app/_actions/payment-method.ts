"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IPaymentMethod } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const fetchPaymentMethods = async () => {
  const res = await FETCH.get<IPaymentMethod[]>(API_ROUTES.PAYMENT_METHODS.GET_PAYMENT_METHODS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PAYMENT_METHODS.GET_ALL]
    }
  })
  return res
}
