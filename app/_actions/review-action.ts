"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IReview } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchProductReviews = async (productId: string) => {
  const res = await FETCH.get<IReview[]>(API_ROUTES.REVIEW.GET_PRODUCT_REVIEWS.replace(":id", productId), {
    next: {
      tags: [[CACHE_KEY.REVIEW.GET_ALL, productId].join(",")]
    },
    cookies
  })
  return res
}

export const fetchUserReviews = async () => {
  const res = await FETCH.get<IReview[]>(API_ROUTES.REVIEW.GET_USER_REVIEWS, {
    cache: "force-cache",
    next: {
      tags: [CACHE_KEY.REVIEW.GET_ALL]
    },
    cookies
  })
  return res
}
