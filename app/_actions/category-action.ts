"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
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

export const fetchCategoryById = async (id: string) => {
  const res = await FETCH.get<ICategory>(API_ROUTES.CATEGORY.GET_CATEGORY.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.CATEGORY.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  return res
}
