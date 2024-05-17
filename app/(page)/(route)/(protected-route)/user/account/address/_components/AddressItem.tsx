"use client"
import { deleteAddress, setDefaultAddress } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { IAddress, IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Button, Chip, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

const AddressEditForm = dynamic(() => import("./AddressForm"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  address: IAddress
  user: IUser
  addressesLength: number
}

const PaymentCardItem = ({ address, addressesLength, user }: Props) => {
  const [showDeletePopover, setShowDeletePopover] = useState(false)
  const [showSetDefaultPopover, setShowSetDefaultPopover] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { execute: deleteExecute, status: deleteStatus } = useAction(deleteAddress, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        setShowDeletePopover(false)
      } else {
        toast.error(data.message)
      }
    }
  })

  const { execute: setDefaultExecute, status: setDefaultStatus } = useAction(setDefaultAddress, {
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

  const addressString = useMemo(() => {
    return [address.specificAddress, address.ward, address.district, address.city, address.country]
      .filter((v) => v)
      .join(", ")
  }, [address])

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4 rounded p-2")}>
      <div className='flex-1 space-y-2'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <p className='text-lg font-medium'>{address.name}</p>
          <Divider orientation='vertical' className='hidden h-4 sm:block' />
          <p className=''>{address.phoneNumber}</p>
          {address.isDefault && (
            <>
              <Divider orientation='vertical' className='hidden h-4 sm:block' />
              <Chip radius='sm' color='primary'>
                Default
              </Chip>
            </>
          )}
        </div>
        <p className='line-clamp-3 max-w-sm text-xs'>{addressString}</p>
      </div>
      <div className='flex flex-col flex-wrap gap-1 sm:gap-2'>
        <div className='flex items-center gap-1 sm:gap-2'>
          <Button size='sm' variant='light' color='primary' onPress={() => setShowEditModal(!showEditModal)}>
            Edit
          </Button>

          <Popover isOpen={showDeletePopover} onOpenChange={setShowDeletePopover}>
            <PopoverTrigger>
              <Button color='danger' size='sm' variant='light' isDisabled={address.isDefault} className='self-end'>
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='flex max-w-sm flex-col gap-4 p-2'>
                <p>Are you sure you want to delete this address?</p>
                <div className='flex gap-2'>
                  <Button
                    color='danger'
                    size='sm'
                    onPress={() => deleteExecute(address._id!)}
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
        </div>
        <Popover isOpen={showSetDefaultPopover} onOpenChange={setShowSetDefaultPopover} placement='top-end'>
          <PopoverTrigger>
            <Button color='primary' size='sm' variant='bordered' isDisabled={address.isDefault}>
              Set as default
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex max-w-sm flex-col items-end gap-4 p-2'>
              <p>
                Are you sure you want to set this address as default? This will change your current default address to
                this address.
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
                      addressId: address._id!
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
      {showEditModal && (
        <AddressEditForm
          address={address}
          onClose={() => setShowEditModal(false)}
          addressesLength={addressesLength}
          user={user}
          visible={showEditModal}
          type='edit'
        />
      )}
    </div>
  )
}

export default PaymentCardItem
