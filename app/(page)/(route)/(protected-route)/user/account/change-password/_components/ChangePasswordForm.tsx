"use client"
import { changePassword } from "@/_actions"
import { PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ChangePasswordFormSchema, changePasswordFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const ChangePasswordForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema)
  })

  const { execute, status } = useAction(changePassword, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message)
        return
      }
      toast.success(data.message)
      reset()
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: ChangePasswordFormSchema) => {
    execute(data)
  }

  return (
    <div className='space-y-2'>
      <h3 className='text-lg font-semibold'>Change password</h3>
      <Divider />
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full max-w-md flex-col gap-4 py-2'>
          <PasswordInput
            {...register("oldPassword")}
            label='Current password'
            placeholder='Enter your current password'
            labelPlacement='outside'
            type='password'
            errorMessage={errors.oldPassword?.message}
            isInvalid={!!errors.oldPassword}
            autoFocus
            description={
              <div className='mt-2 flex justify-end'>
                <Link href={APP_ROUTES.FORGOT_PASSWORD} className='text-sm text-primary underline'>
                  Forgot password?
                </Link>
              </div>
            }
            isDisabled={isLoading}
          />
          <PasswordInput
            {...register("newPassword")}
            label='New password'
            placeholder='Enter your new password'
            labelPlacement='outside'
            type='password'
            errorMessage={errors.newPassword?.message}
            isInvalid={!!errors.newPassword}
            isDisabled={isLoading}
          />
          <PasswordInput
            {...register("confirmPassword")}
            label='Confirm password'
            placeholder='Confirm your new password'
            labelPlacement='outside'
            type='password'
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
            isDisabled={isLoading}
          />
          <div className='flex gap-2'>
            <Button color='primary' radius='sm' type='submit' isDisabled={isLoading} isLoading={isLoading}>
              Change password
            </Button>
            <Button variant='light' radius='sm' type='button' onPress={() => reset()} isDisabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordForm
