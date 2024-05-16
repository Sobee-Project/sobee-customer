"use client"
import { Logo } from "@/_components"
import { API_ROUTES, APP_ROUTES } from "@/_constants"
import { Button, Input, Link } from "@nextui-org/react"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, SendHorizonal, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import NextLink from "next/link"
import React, { useState } from "react"
import { accountRouteMock, otherRouteMock, routeMock, userRouteMock } from "../_mock"

const Footer = () => {
  const [email, setEmail] = useState("")
  return (
    <div className='flex w-full flex-col border-t border-t-gray-100 bg-background px-5 dark:border-t-gray-500 md:px-10 lg:px-[50px] xl:px-16'>
      <div className='grid w-full grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 pt-16 md:grid-cols-3 lg:pb-16 lg:pt-24 xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 2xl:grid-cols-5'>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <Logo />
          </div>
          <p className='text-gray-600 dark:text-slate-300'>
            Sobee is a platform helps you to find and buy the best products from the best brands.
          </p>
          <p>
            Email:{" "}
            <Link href='mailto:customer@sobee.com' color='foreground'>
              customer@sobee.com
            </Link>
          </p>
          <p>
            Tel:{" "}
            <Link href='tel:+1234567890' color='foreground'>
              +1 234 567 890
            </Link>
          </p>
          <div className='flex flex-wrap gap-2'>
            <Facebook size={20} className='cursor-pointer' />
            <Twitter size={20} className='cursor-pointer' />
            <Instagram size={20} className='cursor-pointer' />
            <Youtube size={20} className='cursor-pointer' />
            <Linkedin size={20} className='cursor-pointer' />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <h4 className='text-lg font-semibold'>Explore</h4>
          </div>
          {routeMock.map((route) => (
            <Link key={route.href} href={route.href} color='foreground' underline='hover' as={NextLink}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <h4 className='text-lg font-semibold'>Account</h4>
          </div>
          {accountRouteMock.map((route) => (
            <Link key={route.href} href={route.href} color='foreground' underline='hover' as={NextLink}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <h4 className='text-lg font-semibold'>Customer</h4>
          </div>
          {userRouteMock.map((route) => (
            <Link key={route.href} href={route.href} color='foreground' underline='hover' as={NextLink}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <h4 className='text-lg font-semibold'>Policy</h4>
          </div>
          {otherRouteMock.map((route) => (
            <Link key={route.href} href={route.href} color='foreground' underline='hover' as={NextLink}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-8 md:h-16'>
            <h4 className='text-lg font-semibold'>Subcribe Now</h4>
          </div>
          <p className='text-gray-600'>Subscribe to our newsletter to get the latest news and updates.</p>
          <Input
            placeholder='Enter your email here'
            type='email'
            variant='bordered'
            radius='sm'
            fullWidth
            size='lg'
            endContent={
              email.length > 0 && (
                <motion.button
                  className='transition-colors hover:sm:text-primary'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <SendHorizonal size={20} />
                </motion.button>
              )
            }
            onValueChange={setEmail}
            value={email}
          />
        </div>
      </div>
      <div className='mt-8 flex w-full flex-col items-center gap-2 border-t border-t-gray-200 pb-20 pt-8 dark:border-t-gray-500 lg:mt-0 lg:flex-row lg:justify-between lg:border-t-0 lg:pb-12'>
        <span className='order-2 shrink-0 text-sm lg:order-1'>
          ©2024 Sobee. Copyright © Sobee. All rights reserved worldwide. SOBEE
        </span>
      </div>
    </div>
  )
}

export default Footer
