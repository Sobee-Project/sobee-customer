import { fetchAllAddresses, getCurrentUser } from "@/_actions"
import { IAddress } from "@/_lib/interfaces"
import React from "react"
import { Address } from "./_components"

const page = async () => {
  let addresses = [] as IAddress[]
  const userRes = await getCurrentUser()
  const addressRes = await fetchAllAddresses()

  if (addressRes.success) {
    addresses = addressRes.data!
  }
  const user = userRes.data!.user

  return (
    <div className='flex gap-8 px-10'>
      <Address user={user} addresses={addresses} />
    </div>
  )
}

export default page
