"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"

import { IBrand } from "@/_lib/interfaces/IBrand"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchAllBrands = async () => {
  const res = await FETCH.get<IBrand[]>(API_ROUTES.BRAND.GET_BRANDS, {
    next: {
      tags: [CACHE_KEY.BRAND.GET_ALL]
    },
    cookies
  })
  return res
}

export const fetchBrandById = async (id: string) => {
  const res = await FETCH.get<IBrand>(API_ROUTES.BRAND.GET_BRAND.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.BRAND.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  return res
}
