"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IProduct } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchPublishedProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_PUBLISHED_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_PUBLISHED]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchDraftProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_DRAFT_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_DRAFT]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
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
  if (!res.success) redirect("/" + res.statusCode)
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
  if (!res.success) redirect("/" + res.statusCode)
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
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchRelatedProducts = async () => {
  const res = await FETCH.get<IProduct[]>(API_ROUTES.PRODUCT.GET_RELATED_PRODUCTS, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PRODUCT.GET_RELATED]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchProductById = async (productId: string) => {
  const res = await FETCH.get<IProduct>(API_ROUTES.PRODUCT.GET_PRODUCT, {
    next: {
      tags: [[CACHE_KEY.PRODUCT.GET_BY_ID, productId].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}
