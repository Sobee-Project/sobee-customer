"use client"
import { getCurrentUser, logout } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { motion } from "framer-motion"
import { ChevronDown, LogOut, Menu, UserRound } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useCallback, useEffect, useMemo } from "react"
import toast from "react-hot-toast"
import { otherRouteMock, routeMobileMock, routeMock, userRouteMock } from "../../_mock"

type Props = {
  user?: IUser
}

const Topbar = ({ user }: Props) => {
  const { execute } = useAction(logout, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message || "Logout failed!")
      }
    }
  })
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const isActive = useCallback(
    (href: string) => {
      if (href === "/" && pathname === "/") return true
      return href !== "/" && pathname.includes(href)
    },
    [pathname]
  )

  const disabledKeys = useCallback(
    (
      keys: {
        href: string
        title: string
      }[]
    ) => keys.map((r) => r.href).filter((v) => isActive(v)),
    [isActive]
  )

  return (
    <div className='sticky top-0 z-50 flex items-center justify-between self-start bg-white p-4 shadow-sm md:px-8'>
      <Link href={APP_ROUTES.HOME}>
        <Image src={"/logo_text_light.png"} alt={"Logo"} width={120} height={50} className='object-contain' priority />
      </Link>
      <div className='flex gap-4'>
        <div className='hidden gap-4 md:flex'>
          {routeMock.map(({ href, title }) => (
            <Link
              href={href}
              key={title}
              className={cn("p-2 font-medium transition-colors hover:text-primary", isActive(href) && "text-primary")}
            >
              {title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-2 md:hidden'>
          <Dropdown radius='sm'>
            <DropdownTrigger>
              <Button isIconOnly variant='light' radius='sm'>
                <Menu size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant='light' disabledKeys={disabledKeys(routeMobileMock)}>
              {routeMobileMock.map(({ href, title }) => (
                <DropdownItem key={href} as={Link} href={href} color='primary'>
                  {title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        {user ? (
          <Dropdown radius='sm'>
            <DropdownTrigger>
              <Avatar src={user.avatar} className='cursor-pointer' fallback={<UserRound size={20} />} showFallback />
            </DropdownTrigger>
            <DropdownMenu variant='light' disabledKeys={disabledKeys(userRouteMock)}>
              {
                userRouteMock.map(({ href, title, icon: Icon }) => (
                  <DropdownItem key={href} as={Link} href={href} startContent={<Icon size={16} />} color='primary'>
                    {title}
                  </DropdownItem>
                )) as any
              }
              <DropdownItem key={"logout"} color='danger' onClick={() => execute()} startContent={<LogOut size={16} />}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className='flex gap-4'>
            <Button as={Link} href={APP_ROUTES.LOGIN} color='primary' radius='sm'>
              Login
            </Button>
            <Button as={Link} href={APP_ROUTES.REGISTER} variant='flat' radius='sm'>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar
