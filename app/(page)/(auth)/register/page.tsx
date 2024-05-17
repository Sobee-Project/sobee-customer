"use client"

import { register as registerUser } from "@/_actions"
import { Logo, PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { EGender, ERole } from "@/_lib/enums"
import { RegisterFormSchema, registerFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input, Radio, RadioGroup } from "@nextui-org/react"
import { format } from "date-fns"

import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import titleize from "titleize"

const RegisterPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      dateOfBirth: format(new Date(), "yyyy-MM-dd"),
      gender: EGender.MALE,
      role: ERole.CUSTOMER
    }
  })

  const { execute, status } = useAction(registerUser, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Register successfully!")
      } else {
        toast.error(data.message || "Register failed!")
      }
    }
  })

  const isLoading = status === "executing"

  const handleClickLogin = (data: RegisterFormSchema) => {
    execute(data)
  }

  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-5 py-6 sm:p-8'>
        <form onSubmit={handleSubmit(handleClickLogin)} className='flex w-full flex-col md:max-w-[420px]'>
          <div className='self-center'>
            <Logo />
          </div>
          <p className='mb-8 mt-4 max-w-60 self-center text-center text-sm text-gray-600 dark:text-slate-300 sm:mb-10 sm:mt-5'>
            Register to your account to explore all the features of the app.
          </p>
          <div className='w-full space-y-8'>
            <Input
              {...register("name")}
              label='Name'
              placeholder='John Doe'
              variant='bordered'
              labelPlacement='outside'
              autoFocus
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
            <PasswordInput
              {...register("password")}
              label='Password'
              labelPlacement='outside'
              placeholder='Enter your secret password'
              variant='bordered'
              radius='sm'
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />
            <PasswordInput
              {...register("confirmPassword")}
              label='Confirm password'
              labelPlacement='outside'
              placeholder='Re-enter your secret password'
              variant='bordered'
              radius='sm'
              errorMessage={errors.confirmPassword?.message}
              isInvalid={!!errors.confirmPassword}
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
              defaultValue={watch("gender")}
            >
              {Object.values(EGender).map((item, index) => (
                <Radio key={index} value={item}>
                  {titleize(item)}
                </Radio>
              ))}
            </RadioGroup>

            <Button
              type='submit'
              fullWidth
              variant='solid'
              color='primary'
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <Divider />
            <p className='text-center text-sm'>
              Already have an account?{" "}
              <Link className='text-primary underline transition-opacity hover:opacity-50' href={APP_ROUTES.LOGIN}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className='hidden items-center justify-center bg-gradient-to-bl from-slate-50 to-slate-300 p-4 dark:from-slate-900 dark:to-black md:flex'>
        <Image
          src={"/login_bg.png"}
          alt='login-bg'
          className='hidden object-cover md:block'
          priority={true}
          width={400}
          height={400}
        />
      </div>
    </>
  )
}
export default RegisterPage
