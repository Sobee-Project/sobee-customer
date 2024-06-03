"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { toggleFavoriteFormSchma } from "@/_lib/form-schema"
import { IProduct } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllProducts = async (query?: Record<string, any>) => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_ALL_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_ALL]
    },
    cookies,
    params: query
  })
  return res
}

export const fetchFeaturedProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_FEATURED_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_FEATURED]
    },
    cookies
  })
  return res
}

export const fetchBestSellerProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_BEST_SELLER_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_BEST_SELLER]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchDiscountProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_DISCOUNT_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_DISCOUNT]
    },
    cookies
  })
  return res
}

export const fetchPopularProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_POPULAR_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_POPULAR]
    },
    cookies
  })
  return res
}

export const fetchRelatedProducts = async (productId: string) => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_RELATED_PRODUCTS.replace(":id", productId), {
    cache: "reload",
    next: {
      tags: [[CACHE_KEY.PRODUCT.GET_RELATED, productId].join(",")]
    },
    cookies
  })
  return res
}

export const fetchRecommendProducts = async (productId: string) => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_RECOMMEND_PRODUCTS.replace(":id", productId), {
    cache: "reload",
    next: {
      tags: [[CACHE_KEY.PRODUCT.GET_RECOMMEND, productId].join(",")]
    },
    cookies
  })
  return res
}

export const fetchProductById = async (productId: string) => {
  const res = await FETCH.get<IProduct>(API_ROUTES.PRODUCT.GET_PRODUCT.replace(":id", productId), {
    cache: "reload",
    next: {
      tags: [[CACHE_KEY.PRODUCT.GET_BY_ID, productId].join(", ")]
    },
    cookies
  })
  return res
}

export const fetchAllColors = async () => {
  const res = await FETCH.get<string[]>(API_ROUTES.PRODUCT.GET_COLORS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_COLORS]
    },
    cookies
  })
  return res
}

export const fetchFavoriteProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_CUSTOMER_FAVORITE_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_CUSTOMER_FAVORITE]
    },
    cookies
  })
  return res
}

export const toggleFavorite = safeAction
  .metadata({
    actionName: "Toggle Favorite"
  })
  .schema(toggleFavoriteFormSchma)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<any, IProduct>(
      API_ROUTES.PRODUCT.TOGGLE_FAVORITE_PRODUCT.replace(":id", parsedInput),
      undefined,
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag(CACHE_KEY.PRODUCT.GET_CUSTOMER_FAVORITE)
    }
    return res
  })
