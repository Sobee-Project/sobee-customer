"use client"
import { updateUser } from "@/_actions"
import { EGender } from "@/_lib/enums"
import { UpdateUserFormSchema, updateUserFormSchema } from "@/_lib/form-schema"
import { IUser } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react"
import { format } from "date-fns"
import { useAction } from "next-safe-action/hooks"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import titleize from "titleize"

type Props = {
  user: IUser
}

const UpdateInformationForm = ({ user }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue
  } = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      ...user,
      dateOfBirth: format(new Date(user.dateOfBirth || new Date()), "yyyy-MM-dd")
    }
  })

  const { execute, status } = useAction(updateUser, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: UpdateUserFormSchema) => {
    execute(data)
  }

  return (
    <div className='flex flex-1 justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col md:max-w-[420px]'>
        <div className='w-full space-y-8'>
          <Input
            {...register("name")}
            label='Name'
            placeholder='John Doe'
            variant='bordered'
            labelPlacement='outside'
            fullWidth
            radius='sm'
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            {...register("email")}
            label='Email'
            type='email'
            placeholder='example@host.com'
            variant='bordered'
            labelPlacement='outside'
            radius='sm'
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            {...register("phoneNumber")}
            label='Phone number'
            type='text'
            placeholder='1234567890'
            variant='bordered'
            labelPlacement='outside'
            radius='sm'
            errorMessage={errors.phoneNumber?.message}
            isInvalid={!!errors.phoneNumber}
          />

          <Input
            {...register("dateOfBirth")}
            label='Date of birth'
            labelPlacement='outside'
            type='date'
            variant='bordered'
            radius='sm'
            errorMessage={errors.dateOfBirth?.message}
            isInvalid={!!errors.dateOfBirth}
          />

          <RadioGroup
            orientation='horizontal'
            {...(register("gender"),
            {
              onValueChange: (value) => {
                setValue("gender", value)
              }
            })}
            label='Gender'
            defaultValue={watch("gender") || EGender.MALE}
          >
            {Object.values(EGender).map((item, index) => (
              <Radio key={index} value={item}>
                {titleize(item)}
              </Radio>
            ))}
          </RadioGroup>

          <Button type='submit' variant='solid' color='primary' isDisabled={isLoading} isLoading={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateInformationForm
