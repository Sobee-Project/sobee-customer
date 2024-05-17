"use client"
import { createAddress, updateAddress } from "@/_actions"
import {
  CreateAddressFormSchema,
  UpdateAddressFormSchema,
  createAddressFormSchema,
  updateAddressFormSchema
} from "@/_lib/form-schema"
import { IAddress, IUser } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure
} from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  visible: boolean
  onClose: () => void
  user: IUser
  addressesLength: number
  type?: "create" | "edit"
  address?: IAddress
}

const AddressForm = ({ user, onClose, visible, addressesLength, type = "create", address }: Props) => {
  const isEdit = type === "edit"
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<CreateAddressFormSchema | UpdateAddressFormSchema>({
    resolver: zodResolver(type === "create" ? createAddressFormSchema : updateAddressFormSchema),
    defaultValues: address ?? {
      name: user.name,
      phoneNumber: user.phoneNumber,
      isDefault: addressesLength === 0
    }
  })

  const {
    isOpen,
    onOpenChange,
    onClose: _onClose
  } = useDisclosure({
    isOpen: visible,
    onClose
  })

  const { execute, status } = useAction(isEdit ? updateAddress : createAddress, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        _onClose()
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateAddressFormSchema | UpdateAddressFormSchema) => {
    execute(
      isEdit
        ? {
            ...data,
            _id: address?._id!
          }
        : data
    )
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create new address</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-4'>
                    <Input
                      placeholder='John Doe'
                      {...register("name")}
                      label='Full name'
                      labelPlacement='outside'
                      errorMessage={errors.name?.message}
                      isDisabled={isLoading}
                      isInvalid={!!errors.name}
                      className='flex-1'
                      autoFocus
                    />
                    <Input
                      placeholder='0123456789'
                      {...register("phoneNumber")}
                      label='Phone number'
                      labelPlacement='outside'
                      type='tel'
                      errorMessage={errors.phoneNumber?.message}
                      isDisabled={isLoading}
                      isInvalid={!!errors.phoneNumber}
                      className='flex-1'
                    />
                  </div>
                  <Input
                    placeholder='Enter your country'
                    {...register("country")}
                    label='Country'
                    labelPlacement='outside'
                    errorMessage={errors.country?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.country}
                  />
                  <Input
                    placeholder='Enter your city'
                    {...register("city")}
                    label='City'
                    labelPlacement='outside'
                    errorMessage={errors.city?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.city}
                  />
                  <Input
                    placeholder='Enter your district'
                    {...register("district")}
                    label='District'
                    labelPlacement='outside'
                    errorMessage={errors.district?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.district}
                  />
                  <Input
                    placeholder='Enter your ward'
                    {...register("ward")}
                    label='Ward'
                    labelPlacement='outside'
                    errorMessage={errors.ward?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.ward}
                  />
                  <Textarea
                    placeholder='Enter your specific address'
                    {...register("specificAddress")}
                    label='Specific address'
                    labelPlacement='outside'
                    errorMessage={errors.specificAddress?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.specificAddress}
                  />
                  <Checkbox {...register("isDefault")} isDisabled={addressesLength === 0 || address?.isDefault}>
                    Set as default
                  </Checkbox>
                  <div className='flex justify-end gap-2'>
                    <Button type='submit' color='primary' isLoading={isLoading} isDisabled={isLoading}>
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                    <Button type='button' variant='light' onClick={onClose} isDisabled={isLoading}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AddressForm
