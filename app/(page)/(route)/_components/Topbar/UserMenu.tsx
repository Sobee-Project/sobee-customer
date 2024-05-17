"use client"
import { logout } from "@/_actions"
import { IUser } from "@/_lib/interfaces"
import { disabledNavKeys } from "@/_utils"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { LogOut, UserRound } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { usePathname } from "next/navigation"
import toast from "react-hot-toast"
import { userRouteMock } from "../../_mock"

type Props = {
  user: IUser
  onClose?: () => void
}

const UserMenu = ({ user, onClose = () => {} }: Props) => {
  const pathname = usePathname()

  const { execute } = useAction(logout, {
    onSuccess: ({ data }) => {
      if (!data) {
        return
      }
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message || "Logout failed!")
      }
    }
  })

  return (
    <Dropdown radius='sm'>
      <DropdownTrigger>
        <Avatar src={user.avatar} className='cursor-pointer' fallback={<UserRound size={20} />} showFallback />
      </DropdownTrigger>
      <DropdownMenu variant='light' disabledKeys={disabledNavKeys(userRouteMock, pathname)} onAction={onClose}>
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
  )
}

export default UserMenu
