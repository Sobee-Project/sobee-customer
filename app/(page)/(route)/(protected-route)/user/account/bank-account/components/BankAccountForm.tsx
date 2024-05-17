"use client"

import { createPaymentAccount } from "@/_actions"
import { CreatePaymentAccountFormSchema, createPaymentAccountFormSchema } from "@/_lib/form-schema"
import { IBank } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure
} from "@nextui-org/react"
import { ShieldCheck } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  visible: boolean
  onClose: () => void
  bankList: IBank[]
  accountsLength: number
}

const BankAccountForm = ({ onClose, visible, bankList, accountsLength }: Props) => {
  const {
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    register
  } = useForm<CreatePaymentAccountFormSchema>({
    resolver: zodResolver(createPaymentAccountFormSchema),
    defaultValues: {
      isDefault: accountsLength === 0
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

  const { execute, status } = useAction(createPaymentAccount, {
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

  const onSubmit = (data: CreatePaymentAccountFormSchema) => {
    execute(data)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create new bank account</ModalHeader>
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
                  <Select
                    label='Bank'
                    labelPlacement='outside'
                    placeholder='Please choose a bank'
                    {...(register("bankName"),
                    {
                      onSelectionChange: (value) => setValue("bankName", Array.from(value)[0].toString())
                    })}
                  >
                    {bankList.map((bank) => (
                      <SelectItem key={bank.shortName} value={bank.shortName} textValue={bank.name}>
                        <div className='flex items-center gap-2'>
                          <div className='max-w-14'>
                            <Image src={bank.logo} width={60} height={60} alt={bank.name} />
                          </div>
                          <p className='line-clamp-1 flex-1'>{bank.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    placeholder='Card number'
                    {...register("accountNumber")}
                    label='Card number'
                    labelPlacement='outside'
                    errorMessage={errors.accountNumber?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.accountNumber}
                  />
                  <Input
                    placeholder='Full name (uppercase, no special characters)'
                    {...register("accountHolderName")}
                    label='Card holder'
                    labelPlacement='outside'
                    errorMessage={errors.accountHolderName?.message}
                    isDisabled={isLoading}
                    isInvalid={!!errors.accountHolderName}
                  />
                  <Checkbox {...register("isDefault")} isDisabled={accountsLength === 0}>
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

export default BankAccountForm
