"use client"
import { ScreenLoader } from "@/_components"
import { IBank, IPaymentAccount } from "@/_lib/interfaces"
import { Button, Divider } from "@nextui-org/react"
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import BankAccountItem from "./BankAccountItem"

const BankAccountForm = dynamic(() => import("./BankAccountForm"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  accounts: IPaymentAccount[]
  bankList: IBank[]
}

const BankAccount = ({ accounts, bankList }: Props) => {
  const [showCardForm, setShowCardForm] = useState(false)
  return (
    <>
      <div className='space-y-2'>
        <div className='flex items-center justify-between gap-2'>
          <h3 className='text-lg font-semibold'>Bank Account</h3>
          <Button
            radius='sm'
            color='primary'
            size='sm'
            startContent={<Plus size={20} />}
            onPress={() => setShowCardForm(true)}
          >
            <span className='hidden sm:block'>Create new bank account</span>
          </Button>
        </div>
        <Divider />
        {accounts.length > 0 ? (
          accounts.map((account, index) => <BankAccountItem key={account._id} bankAccount={account} />)
        ) : (
          <div>No bank account added</div>
        )}
      </div>

      {showCardForm && (
        <BankAccountForm
          visible={showCardForm}
          onClose={() => setShowCardForm(false)}
          bankList={bankList}
          accountsLength={accounts.length}
        />
      )}
    </>
  )
}

export default BankAccount
