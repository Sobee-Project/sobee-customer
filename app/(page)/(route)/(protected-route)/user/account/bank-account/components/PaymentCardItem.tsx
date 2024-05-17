"use client"
import { deleteCard, setDefaultCard } from "@/_actions"
import { ICard } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Button, Chip, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { Eye, EyeOff } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  card: ICard
}

const PaymentCardItem = ({ card }: Props) => {
  const [showDeletePopover, setShowDeletePopover] = useState(false)
  const [showSetDefaultPopover, setShowSetDefaultPopover] = useState(false)
  const [showNumber, setShowNumber] = useState(false)

  const { execute: deleteExecute, status: deleteStatus } = useAction(deleteCard, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        setShowDeletePopover(false)
      } else {
        toast.error(data.message)
      }
    }
  })

  const { execute: setDefaultExecute, status: setDefaultStatus } = useAction(setDefaultCard, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        setShowSetDefaultPopover(false)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isDeleting = deleteStatus === "executing"
  const isSettingDefault = setDefaultStatus === "executing"
  const renderAccountNumber = useMemo(() => {
    return showNumber ? card.cardNumber : card.cardNumber.replace(/\d(?=\d{4})/g, "*")
  }, [card.cardNumber, showNumber])

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 rounded border-primary p-2")}>
      <div className='flex-1 space-y-1'>
        <div className='flex items-center gap-4'>
          <p className='text-lg font-medium'>{renderAccountNumber}</p>
          <Divider orientation='vertical' className='hidden h-4 sm:block' />
          <Button size='sm' variant='light' color='primary' onPress={() => setShowNumber(!showNumber)} isIconOnly>
            {!showNumber ? <Eye size={20} /> : <EyeOff size={20} />}
          </Button>
          {card.isDefault && (
            <>
              <Divider orientation='vertical' className='hidden h-4 sm:block' />
              <Chip radius='sm' color='primary'>
                Default
              </Chip>
            </>
          )}
        </div>
        <p className='text-xs'>
          {card.cardBrand} - {card.cardHolderName}
        </p>
      </div>
      <div className='flex flex-col flex-wrap gap-2 sm:flex-row'>
        <Popover isOpen={showDeletePopover} onOpenChange={setShowDeletePopover}>
          <PopoverTrigger>
            <Button color='danger' size='sm' variant='light' isDisabled={card.isDefault}>
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex max-w-sm flex-col gap-4 p-2'>
              <p>Are you sure you want to delete this card?</p>
              <div className='flex gap-2'>
                <Button
                  color='danger'
                  size='sm'
                  onPress={() => deleteExecute(card._id!)}
                  isDisabled={isDeleting}
                  isLoading={isDeleting}
                >
                  Confirm
                </Button>
                <Button size='sm' variant='light' isDisabled={isDeleting} onPress={() => setShowDeletePopover(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover isOpen={showSetDefaultPopover} onOpenChange={setShowSetDefaultPopover} placement='top-end'>
          <PopoverTrigger>
            <Button color='primary' size='sm' variant='bordered' isDisabled={card.isDefault}>
              Set as default
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex max-w-sm flex-col items-end gap-4 p-2'>
              <p>
                Are you sure you want to set this card as default? This will change your current default card to this
                card.
              </p>
              <div className='flex gap-2'>
                <Button
                  size='sm'
                  variant='light'
                  isDisabled={isSettingDefault}
                  onPress={() => setShowSetDefaultPopover(false)}
                >
                  Cancel
                </Button>
                <Button
                  color='primary'
                  size='sm'
                  onPress={() =>
                    setDefaultExecute({
                      cardId: card._id!
                    })
                  }
                  isDisabled={isSettingDefault}
                  isLoading={isSettingDefault}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default PaymentCardItem
