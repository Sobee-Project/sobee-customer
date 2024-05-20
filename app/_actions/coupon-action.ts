"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ICoupon } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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
