"use client"

import { createCard } from "@/_actions"
import { CreateCardFormSchema, createCardFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import cardValidator from "card-validator"
import { ShieldCheck } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  visible: boolean
  onClose: () => void
  cardsLength: number
}

const CardForm = ({ onClose, visible, cardsLength }: Props) => {
  const {
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    register,
    setError,
    clearErrors
  } = useForm<CreateCardFormSchema>({
    resolver: zodResolver(createCardFormSchema),
    defaultValues: {
      isDefault: cardsLength === 0
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

  const { execute, status } = useAction(createCard, {
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

  const formatExpiryDate = (value: string) => {
    const expdate = value
    const expDateFormatter =
      expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2 ? "/" : "") +
      expdate.replace(/\//g, "").substring(2, 4)
    return expDateFormatter
  }

  const verifyCardNumber = () => {
    const value = watch("cardNumber")
    const cardNumberValidation = cardValidator.number(value)

    if (cardNumberValidation.isValid && cardNumberValidation.card) {
      setValue("cardBrand", cardNumberValidation.card.niceType)
      clearErrors("cardNumber")
    } else {
      setError("cardNumber", {
        type: "manual",
        message: "Invalid card number"
      })
    }
  }

  const verifyCardHolderName = () => {
    const value = watch("cardHolderName")
    const cardHolderNameValidation = cardValidator.cardholderName(value)

    if (cardHolderNameValidation.isValid) {
      clearErrors("cardHolderName")
    } else {
      setError("cardHolderName", {
        type: "manual",
        message: "Invalid card holder name"
      })
    }
  }

  const verifyExpiryDate = () => {
    const value = watch("expiryDate")
    const expiryDateValidation = cardValidator.expirationDate(value)
    if (expiryDateValidation.isValid) {
      clearErrors("expiryDate")
    } else {
      setError("expiryDate", {
        type: "manual",
        message: "Invalid expiry date"
      })
    }
  }

  const verifyCVV = () => {
    const value = watch("cvv")
    const cvvValidation = cardValidator.cvv(value)
    if (cvvValidation.isValid) {
      clearErrors("cvv")
    } else {
      setError("cvv", {
        type: "manual",
        message: "Invalid CVV"
      })
    }
  }

  const verifyPostalCode = () => {
    const value = watch("postalCode")
    const postalCodeValidation = cardValidator.postalCode(value)

    if (postalCodeValidation.isValid) {
      clearErrors("postalCode")
    } else {
      setError("postalCode", {
        type: "manual",
        message: "Invalid postal code"
      })
    }
  }

  const onSubmit = (data: CreateCardFormSchema) => {
    execute(data)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create new card</ModalHeader>
            <ModalBody>
              <div className='flex gap-4 rounded border border-success bg-success-50/50 p-2'>
                <div>
                  <ShieldCheck size={24} className='text-success' />
                </div>
                <div>
                  <p className='font-medium'>Your card information is protected.</p>
                  <p className='text-sm'>
                    We cooperate with reputable payment service providers to ensure your card information is absolutely
                    safe and secure. Sobee will not have access to your card information.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>
                  <Input
                    placeholder='Card number'
                    {...register("cardNumber", {
                      onChange: verifyCardNumber
                    })}
                    autoFocus
                    label='Card number'
                    labelPlacement='outside'
                    errorMessage={errors.cardNumber?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.cardNumber}
                  />
                  <Input
                    placeholder='JOHN DOE'
                    {...register("cardHolderName", {
                      onChange: verifyCardHolderName
                    })}
                    label='Card holder'
                    labelPlacement='outside'
                    errorMessage={errors.cardHolderName?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.cardHolderName}
                  />
                  <div className='flex gap-4'>
                    <Input
                      placeholder='MM/YY'
                      {...register("expiryDate", {
                        onChange: verifyExpiryDate
                      })}
                      maxLength={5}
                      label='Expiry date'
                      labelPlacement='outside'
                      onValueChange={(value) => {
                        setValue("expiryDate", formatExpiryDate(value))
                      }}
                      value={watch("expiryDate")}
                      errorMessage={errors.expiryDate?.message}
                      isDisabled={isLoading}
                      isInvalid={!!errors.expiryDate}
                    />
                    <Input
                      placeholder='XXX'
                      {...register("cvv", {
                        onChange: verifyCVV
                      })}
                      label='CVV/CVC'
                      labelPlacement='outside'
                      maxLength={4}
                      errorMessage={errors.cvv?.message}
                      isInvalid={!!errors.cvv}
                      isDisabled={isLoading}
                    />
                    <Input
                      placeholder='XXXXXX'
                      {...register("postalCode", {
                        onChange: verifyPostalCode
                      })}
                      label='Postal code'
                      labelPlacement='outside'
                      maxLength={6}
                      errorMessage={errors.postalCode?.message}
                      isInvalid={!!errors.postalCode}
                      isDisabled={isLoading}
                    />
                  </div>
                  <Checkbox {...register("isDefault")} isDisabled={cardsLength === 0}>
                    Set as default
                  </Checkbox>
                  <div className='flex justify-end gap-2'>
                    <Button type='submit' color='primary' isLoading={isLoading} isDisabled={isLoading}>
                      {isLoading ? "Creating..." : "Create"}
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

export default CardForm
