"use client"
import { ScreenLoader } from "@/_components"
import { ICard } from "@/_lib/interfaces"
import { Button, Divider } from "@nextui-org/react"
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import PaymentCardItem from "./PaymentCardItem"

const CardForm = dynamic(() => import("./CardForm"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  cards: ICard[]
}

const PaymentCardList = ({ cards }: Props) => {
  const [showCardForm, setShowCardForm] = useState(false)
  return (
    <>
      <div className='space-y-2'>
        <div className='flex items-center justify-between gap-2'>
          <h3 className='text-lg font-semibold'>Credit/Debit Card</h3>
          <Button
            radius='sm'
            color='primary'
            size='sm'
            startContent={<Plus size={20} />}
            onPress={() => setShowCardForm(true)}
          >
            <span className='hidden sm:block'>Add new card</span>
          </Button>
        </div>
        <Divider />
        {cards.length > 0 ? (
          cards.map((card, index) => <PaymentCardItem key={card._id} card={card} />)
        ) : (
          <div>There are no cards available</div>
        )}
      </div>

      {showCardForm && (
        <CardForm visible={showCardForm} onClose={() => setShowCardForm(false)} cardsLength={cards.length} />
      )}
    </>
  )
}

export default PaymentCardList
