"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { EOrderStatus } from "@/_lib/enums"
import {
  CreateOrderFormSchema,
  CreateOrderItemFormSchema,
  UpdateOrderItemQuantityFormSchema,
  createOrderFormSchema,
  createOrderItemFormSchema,
  removeOrderItemFormSchema,
  updateOrderItemQuantityFormSchema
} from "@/_lib/form-schema"
import { IOrder, IOrderItem } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export const createOrderItem = async (orderItem: IOrderItem) => {
  return await FETCH.post<IOrderItem, IOrderItem>(API_ROUTES.ORDER.ADD_ORDER_ITEM, orderItem, {
    cookies
  })
}

export const fetchOrderItems = async () => {
  return await FETCH.get<IOrderItem[]>(API_ROUTES.ORDER.GET_ORDER_ITEMS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.ORDER_ITEM.GET_ALL]
    }
  })
}

export const removeOrderItem = async (orderItemId: string) => {
  return await FETCH.delete<IOrderItem>(API_ROUTES.ORDER.DELETE_ORDER_ITEM.replace(":id", orderItemId), {
    cookies
  })
}

export const updateOrderItemQuantity = async (id: string, quantity: number) => {
  return await FETCH.put<UpdateOrderItemQuantityFormSchema, IOrderItem>(
    API_ROUTES.ORDER.UPDATE_ORDER_ITEM_QUANTITY.replace(":id", id),
    {
      quantity,
      _id: id
    },
    {
      cookies
    }
  )
}

export const createOrder = safeAction
  .metadata({
    actionName: "Create Order"
  })
  .schema(createOrderFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<CreateOrderFormSchema, IOrder>(API_ROUTES.ORDER.CREATE, parsedInput, {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.ORDER.GET_ALL)
    }

    return res
  })

export const fetchAllOrders = async (query?: any) => {
  return await FETCH.get<IOrder[]>(API_ROUTES.ORDER.GET_ORDERS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.ORDER.GET_ALL]
    },
    params: query
  })
}

export const fetchOrderById = async (id: string) => {
  const res = await FETCH.get<IOrder>(API_ROUTES.ORDER.GET_ORDER.replace(":id", id), {
    cache: "reload",
    next: {
      tags: [[CACHE_KEY.ORDER.GET_BY_ID, id].join(",")]
    },
    cookies
  })
  return res
}

export const cancelOrder = safeAction
  .metadata({
    actionName: "Cancel Order"
  })
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<IOrder>(API_ROUTES.ORDER.CANCLE_ORDER.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ORDER.GET_ALL)
      revalidateTag([CACHE_KEY.ORDER.GET_BY_ID, parsedInput].join(","))
    }
    return res
  })

export const reOrder = safeAction
  .metadata({
    actionName: "Re Order"
  })
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<any, IOrder>(API_ROUTES.ORDER.RE_ORDER.replace(":id", parsedInput), undefined, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ORDER.GET_ALL)
      revalidateTag([CACHE_KEY.ORDER.GET_BY_ID, parsedInput].join(","))
    }
    return res
  })
