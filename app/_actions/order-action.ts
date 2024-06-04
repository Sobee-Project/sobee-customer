"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
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

export const createOrderItem = async (orderItem: IOrderItem) => {
  return await FETCH.post<IOrderItem, IOrderItem>(API_ROUTES.ORDER.ADD_ORDER_ITEM, orderItem, {
    cookies
  })
}

// export const createOrderItem = safeAction
//   .metadata({
//     actionName: "Create Order Item"
//   })
//   .schema(createOrderItemFormSchema)
//   .action(async ({ parsedInput }) => {
//     const res = await FETCH.post<CreateOrderItemFormSchema, IOrderItem>(API_ROUTES.ORDER.ADD_ORDER_ITEM, parsedInput, {
//       cookies
//     })

//     if (res.success) {
//       revalidateTag(CACHE_KEY.ORDER_ITEM.GET_ALL)
//     }
//     return res
//   })

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

// export const removeOrderItem = safeAction
//   .metadata({
//     actionName: "Remove Order Item"
//   })
//   .schema(removeOrderItemFormSchema)
//   .action(async ({ parsedInput }) => {
//     const res = await FETCH.delete<IOrderItem>(API_ROUTES.ORDER.DELETE_ORDER_ITEM.replace(":id", parsedInput), {
//       cookies
//     })

//     if (res.success) {
//       revalidateTag(CACHE_KEY.ORDER_ITEM.GET_ALL)
//     }

//     console.log(res)
//     return res
//   })

// export const updateOrderItemQuantity = safeAction
//   .metadata({
//     actionName: "Update Order Item Quantity"
//   })
//   .schema(updateOrderItemQuantityFormSchema)
//   .action(async ({ parsedInput }) => {
//     const res = await FETCH.put<UpdateOrderItemQuantityFormSchema, IOrderItem>(
//       API_ROUTES.ORDER.UPDATE_ORDER_ITEM_QUANTITY.replace(":id", parsedInput._id),
//       parsedInput,
//       {
//         cookies
//       }
//     )

//     if (res.success) {
//       revalidateTag(CACHE_KEY.ORDER_ITEM.GET_ALL)
//     }

//     return res
//   })

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

export const fetchAllOrders = async () => {
  return await FETCH.get<IOrder[]>(API_ROUTES.ORDER.GET_ORDERS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.ORDER.GET_ALL]
    }
  })
}
