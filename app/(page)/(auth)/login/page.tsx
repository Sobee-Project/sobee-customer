"use client"

import { login } from "@/_actions"
import { Logo, PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { LoginFormSchema, loginFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input } from "@nextui-org/react"

import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const LoginPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const { execute, status } = useAction(login, {
    onSuccess: ({ data }) => {
      if (!data) {
        return
      }
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message || "Login failed!")
      }
    }
  })

  const isLoading = status === "executing"

  const handleClickLogin = (data: LoginFormSchema) => {
    execute(data)
  }

  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-5 py-6 sm:p-8'>
        <form onSubmit={handleSubmit(handleClickLogin)} className='flex w-full flex-col md:max-w-[420px]'>
          <div className='self-center'>
            <Logo />
          </div>
          <p className='mb-8 mt-4 max-w-56 self-center text-center text-sm text-gray-600 dark:text-slate-300 sm:mb-10 sm:mt-5'>
            Login to your account to access all the features of the app.
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
            <PasswordInput
              {...register("password")}
              label='Password'
              labelPlacement='outside'
              placeholder='Enter your secret password'
              variant='bordered'
              radius='sm'
              fullWidth
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              description={
                <div className='mt-2 flex justify-end'>
                  <Link href={APP_ROUTES.FORGOT_PASSWORD} className='text-sm text-primary underline'>
                    Forgot password?
                  </Link>
                </div>
              }
            />
            <Button
              type='submit'
              fullWidth
              variant='solid'
              color='primary'
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Logging in" : "Login"}
            </Button>
            <Divider />
            <p className='text-center text-sm'>
              Don&apos;t have any account?{" "}
              <Link className='text-primary underline transition-opacity hover:opacity-50' href={APP_ROUTES.REGISTER}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className='hidden items-center justify-center bg-gradient-to-bl from-slate-50 to-slate-300 p-4 dark:from-slate-900 dark:to-black md:flex'>
        <Image
          src={"/register_bg.png"}
          alt='register-bg'
          className='hidden object-cover md:block'
          priority={true}
          width={400}
          height={400}
        />
      </div>
    </>
  )
}
export default LoginPage
