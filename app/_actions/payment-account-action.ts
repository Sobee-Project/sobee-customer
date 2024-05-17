"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import {
  createPaymentAccountFormSchema,
  deletePaymentAccountSchema,
  setDefaultPaymentAccountSchema
} from "@/_lib/form-schema"
import { IFaq, IPaymentAccount } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const fetchAllPaymentAccounts = async () => {
  const res = await FETCH.get<IPaymentAccount[]>(API_ROUTES.PAYMENT_ACCOUNT.GET_PAYMENT_ACCOUNTS, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.PAYMENT_ACCOUNT.GET_ALL]
    }
  })
  return res
}

export const createPaymentAccount = safeAction
  .metadata({
    actionName: "Create PaymentAccount"
  })
  .schema(createPaymentAccountFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IPaymentAccount, IPaymentAccount>(API_ROUTES.PAYMENT_ACCOUNT.CREATE, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.PAYMENT_ACCOUNT.GET_ALL)
    }
    return res
  })

export const setDefaultPaymentAccount = safeAction
  .metadata({
    actionName: "Set Default PaymentAccount"
  })
  .schema(setDefaultPaymentAccountSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<
      {
        paymentAccountId: string
      },
      IPaymentAccount
    >(API_ROUTES.PAYMENT_ACCOUNT.SET_DEFAULT, parsedInput, { cookies })
    if (res.success) {
      revalidateTag(CACHE_KEY.PAYMENT_ACCOUNT.GET_ALL)
    }
    return res
  })

export const deletePaymentAccount = safeAction
  .metadata({
    actionName: "Delete PaymentAccount"
  })
  .schema(deletePaymentAccountSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<IPaymentAccount>(
      API_ROUTES.PAYMENT_ACCOUNT.DELETE_PAYMENT_ACCOUNT.replace(":id", parsedInput),
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag(CACHE_KEY.PAYMENT_ACCOUNT.GET_ALL)
    }
    return res
  })
