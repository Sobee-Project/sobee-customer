"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IProduct } from "@/_lib/interfaces"

import { IBrand } from "@/_lib/interfaces/IBrand"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchAllBrands = async (query?: any) => {
  const res = await FETCH.get<IBrand[]>(API_ROUTES.BRAND.GET_BRANDS, {
    next: {
      tags: [CACHE_KEY.BRAND.GET_ALL]
    },
    cookies,
    params: query
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

export const fetchBrandProducts = async (id: string, query?: any) => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.BRAND.GET_BRAND_PRODUCTS.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.BRAND.GET_PRODUCTS, id].join(",")]
    },
    params: query,
    cookies
  })
  return res
}

export const fetchBrandAndProducts = async (query?: any) => {
  const res = await FETCH.get<
    ({
      products: IProduct[]
    } & IBrand)[]
  >(API_ROUTES.BRAND.GET_BRAND_AND_PRODUCTS, {
    next: {
      tags: [CACHE_KEY.BRAND.GET_BRAND_AND_PRODUCTS]
    },
    params: query,
    cookies
  })
  return res
}
