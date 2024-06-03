"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ICategory, IProduct } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchAllCategories = async () => {
  const res = await FETCH.get<ICategory[]>(API_ROUTES.CATEGORY.GET_CATEGORIES, {
    next: {
      tags: [CACHE_KEY.CATEGORY.GET_ALL]
    },
    cookies
  })
  return res
}

export const fetchCategoryProducts = async (id: string, query?: any) => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.CATEGORY.GET_CATEGORY_PRODUCTS.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.CATEGORY.GET_PRODUCTS, id].join(",")]
    },
    params: query,
    cookies
  })
  return res
}

export const fetchCategoryAndProducts = async (query?: any) => {
  const res = await FETCH.get<
    ({
      products: IProduct[]
    } & ICategory)[]
  >(API_ROUTES.CATEGORY.GET_CATEGORY_AND_PRODUCTS, {
    next: {
      tags: [CACHE_KEY.CATEGORY.GET_CATEGORY_AND_PRODUCTS]
    },
    params: query,
    cookies
  })
  return res
}
