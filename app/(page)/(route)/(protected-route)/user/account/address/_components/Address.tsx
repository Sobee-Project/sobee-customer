"use client"
import { ScreenLoader } from "@/_components"
import { IAddress, IBank, IPaymentAccount, IUser } from "@/_lib/interfaces"
import { Button, Divider } from "@nextui-org/react"
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import AddressItem from "./AddressItem"

const AddressForm = dynamic(() => import("./AddressForm"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  addresses: IAddress[]
  user: IUser
}

const Address = ({ addresses, user }: Props) => {
  const [showCardForm, setShowCardForm] = useState(false)
  return (
    <>
      <div className='flex-1 space-y-2'>
        <div className='flex items-center justify-between gap-2'>
          <h3 className='text-lg font-semibold'>My addresses</h3>
          <Button
            radius='sm'
            color='primary'
            size='sm'
            startContent={<Plus size={20} />}
            onPress={() => setShowCardForm(true)}
          >
            <span className='hidden sm:block'>Create new address</span>
          </Button>
        </div>
        <Divider />
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <AddressItem key={address._id} address={address} addressesLength={addresses.length} user={user} />
          ))
        ) : (
          <div>No address added</div>
        )}
      </div>

      {showCardForm && (
        <AddressForm
          visible={showCardForm}
          onClose={() => setShowCardForm(false)}
          user={user}
          addressesLength={addresses.length}
        />
      )}
    </>
  )
}

export default Address
