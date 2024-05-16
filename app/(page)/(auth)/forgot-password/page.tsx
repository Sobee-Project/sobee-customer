"use client"
import { forgotPassword } from "@/_actions"
import { Logo } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ForgotPasswordFormSchema, forgotPasswordFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema)
  })

  const { execute, status } = useAction(forgotPassword, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })
  const isLoading = status === "executing"

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    execute(data)
  }

  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-5 py-6 sm:p-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col md:max-w-[420px]'>
          <div className='self-center'>
            <Logo />
          </div>
          <p className='mb-8 mt-4 max-w-56 self-center text-center text-sm text-gray-600 dark:text-slate-300 sm:mb-10 sm:mt-5'>
            We will send you a new password to your email.
          </p>
          <div className='w-full space-y-8'>
            <Input
              {...register("emailOrPhone")}
              label='Email/Phone number'
              type='text'
              placeholder='example@host.com'
              variant='bordered'
              labelPlacement='outside'
              autoFocus
              fullWidth
              radius='sm'
              errorMessage={errors.emailOrPhone?.message}
              isInvalid={!!errors.emailOrPhone}
            />

            <Button
              type='submit'
              fullWidth
              variant='solid'
              color='primary'
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
            <Divider />
            <p className='text-center text-sm'>
              Already have an account?{" "}
              <Link className='text-primary underline transition-opacity hover:opacity-50' href={APP_ROUTES.LOGIN}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className='hidden items-center justify-center bg-gradient-to-bl from-slate-50 to-slate-300 p-4 dark:from-slate-600 dark:to-black md:flex'>
        <Image
          src={"/forgot_password.svg"}
          alt='forgot-password-bg'
          className='hidden object-cover md:block'
          priority={true}
          width={400}
          height={400}
        />
      </div>
    </>
  )
}

export default Page
