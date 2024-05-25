"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { CreateOrderItemFormSchema, createOrderItemFormSchema } from "@/_lib/form-schema"
import { IOrder, IOrderItem } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const createOrderItem = safeAction
  .metadata({
    actionName: "Create Order Item"
  })
  .schema(createOrderItemFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<CreateOrderItemFormSchema, IOrderItem>(API_ROUTES.ORDER.ADD_ORDER_ITEM, parsedInput, {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.ORDER_ITEM.GET_ALL)
    }
    return res
  })
