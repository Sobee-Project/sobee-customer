"use client"
import { Logo } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { isNavActive } from "@/_utils"
import { Button, Divider, Listbox, ListboxItem, Spinner } from "@nextui-org/react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback, useMemo } from "react"
import { routeMobileMock } from "../../_mock"

const UserMenu = dynamic(() => import("./UserMenu"), {
  ssr: false,
  loading: () => <Spinner />
})

type Props = {
  visible: boolean
  onClose: () => void
  user?: IUser
}

const MobileMenu = ({ onClose, visible, user }: Props) => {
  const pathname = usePathname()

  return (
    <div className={`fixed inset-0 z-[60]`}>
      <div className='absolute right-0 top-0 h-full w-4/5 bg-slate-700/50' onClick={onClose} />
      <motion.div
        className='flex h-full w-4/5 flex-col gap-4 bg-background p-4 shadow-lg'
        initial={{ x: "-100%" }}
        animate={{ x: visible ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <Logo />
        <Divider />
        <Listbox variant='light' color='primary' className='flex-1'>
          {routeMobileMock.map(({ href, title }) => (
            <ListboxItem
              key={href}
              as={Link}
              href={href}
              onPress={onClose}
              classNames={{
                title: cn("text-lg font-semibold", isNavActive(href, pathname) ? "text-primary" : "text-foreground")
              }}
            >
              {title}
            </ListboxItem>
          ))}
        </Listbox>
        <Divider />
        {user ? (
          <div className='flex items-center gap-4'>
            <UserMenu user={user} onClose={onClose} />
            <div className='flex-1'>
              <h3 className='font-semibold'>{user.name}</h3>
              <p className='text-sm'>{user.email}</p>
            </div>
          </div>
        ) : (
          <div className='flex gap-4'>
            <Button as={Link} href={APP_ROUTES.LOGIN} color='primary' radius='sm' className='flex-1'>
              Login
            </Button>
            <Button as={Link} href={APP_ROUTES.REGISTER} variant='flat' radius='sm' className='flex-1'>
              Register
            </Button>
          </div>
        )}
      </motion.div>
      <motion.div
        className='absolute right-4 top-4'
        initial={{ x: "100%" }}
        animate={{ x: visible ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <Button isIconOnly radius='full' variant='solid' color='default' className='shadow-lg' onPress={onClose}>
          <X />
        </Button>
      </motion.div>
    </div>
  )
}

export default MobileMenu
