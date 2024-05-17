"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import {
  createAddressFormSchema,
  deleteAddressFormSchema,
  setDefaultAddressFormSchema,
  updateAddressFormSchema
} from "@/_lib/form-schema"
import { IAddress } from "@/_lib/interfaces"

import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const fetchAllAddresses = async () => {
  const res = await FETCH.get<IAddress[]>(API_ROUTES.ADDRESS.GET_ADDRESSES, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.BRAND.GET_ALL]
    },
    cookies
  })
  return res
}

export const createAddress = safeAction
  .metadata({
    actionName: "Create Address"
  })
  .schema(createAddressFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IAddress>(API_ROUTES.ADDRESS.CREATE, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ADDRESS.GET_ADDRESSES)
    }
    return res
  })

export const updateAddress = safeAction
  .metadata({
    actionName: "Update Address"
  })
  .schema(updateAddressFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<IAddress>(API_ROUTES.ADDRESS.UPDATE.replace(":id", parsedInput._id), parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ADDRESS.GET_ADDRESSES)
    }
    return res
  })

export const deleteAddress = safeAction
  .metadata({
    actionName: "Delete Address"
  })
  .schema(deleteAddressFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<IAddress>(API_ROUTES.ADDRESS.DELETE_ADDRESS.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ADDRESS.GET_ADDRESSES)
    }
    return res
  })

export const setDefaultAddress = safeAction
  .metadata({
    actionName: "Set Default Address"
  })
  .schema(setDefaultAddressFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<{
      addressId: string
    }>(API_ROUTES.ADDRESS.SET_DEFAULT, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ADDRESS.GET_ADDRESSES)
    }
    return res
  })
