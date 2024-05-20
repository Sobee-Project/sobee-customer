import { fetchAllCards, fetchAllPaymentAccounts, getCurrentUser } from "@/_actions"
import { THIRD_PARTY } from "@/_constants"
import { IBank, ICard, IPaymentAccount } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { Button, Divider } from "@nextui-org/react"
import { Plus } from "lucide-react"
import React from "react"
import { BankAccount, PaymentCardList } from "./components"

const page = async () => {
  let cardData = [] as ICard[]
  let accountData = [] as IPaymentAccount[]
  let bankList = [] as IBank[]
  const cardRes = await fetchAllCards()
  const accountRes = await fetchAllPaymentAccounts()
  const bankRes = await fetch(THIRD_PARTY.API.VIETQR_BANK_LIST_API_URL, {
    cache: "force-cache"
  })
  const bankJson = await bankRes.json()

  if (cardRes.success) {
    cardData = cardRes.data!
  }

  if (accountRes.success) {
    accountData = accountRes.data!
  }

  if (bankJson.data) {
    bankList = bankJson.data
  }

  return (
    <div className='flex flex-col gap-8 px-10'>
      <PaymentCardList cards={cardData} />
      <BankAccount accounts={accountData} bankList={bankList} />
    </div>
  )
}

export default page
