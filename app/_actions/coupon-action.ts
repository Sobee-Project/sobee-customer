"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ValidateCouponFormSchema, validateCouponFormSchema } from "@/_lib/form-schema"
import { ICoupon } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export const fetchAllCoupons = async () => {
  const res = await FETCH.get<ICoupon[]>(API_ROUTES.COUPONS.GET_COUPONS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.COUPONS.GET_ALL]
    }
  })
  return res
}

export const fetchTodayCoupons = async () => {
  const res = await FETCH.get<ICoupon[]>(API_ROUTES.COUPONS.GET_TODAY_COUPONS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.COUPONS.GET_TODAY]
    }
  })
  return res
}

export const applyCoupon = safeAction
  .metadata({
    actionName: "Apply Coupon"
  })
  .schema(validateCouponFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<ValidateCouponFormSchema, ICoupon>(API_ROUTES.COUPONS.APPLY_COUPON, parsedInput, {
      cookies
    })

    return res
  })

export const fetchByCode = async (code: string) => {
  const res = await FETCH.get<ICoupon>(API_ROUTES.COUPONS.GET_BY_CODE.replace(":code", code), {
    cookies
  })
  return res
}
