"use client"
import { invalidateCookies } from "@/_actions"
import { Logo, ScreenLoader, ThemeSwitcher } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { useCartStore, useFavoriteStore } from "@/_store"
import { isNavActive } from "@/_utils"
import { Badge, Button, Spinner } from "@nextui-org/react"
import { Menu, ShoppingCart } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { routeMock } from "../../_mock"

const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

const UserMenu = dynamic(() => import("./UserMenu"), {
  ssr: false,
  loading: () => <Spinner />
})

const CartMenu = dynamic(() => import("./CartMenu"), {
  ssr: false,
  loading: () => <Spinner />
})

type Props = {
  user?: IUser
}

const Topbar = ({ user }: Props) => {
  const pathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  const { execute } = useAction(invalidateCookies)
  const { orderItems: cart, loadOrderItems } = useCartStore()
  const { loadFavoriteProducts } = useFavoriteStore()

  useEffect(() => {
    if (user) return
    execute()
  }, [execute, user])

  useEffect(() => {
    if (user) {
      Promise.all([loadOrderItems(), loadFavoriteProducts()])
    }
  }, [loadFavoriteProducts, loadOrderItems, user])

  return (
    <div className='sticky top-0 z-50 flex items-center justify-between self-start bg-background p-4 shadow-sm dark:bg-gradient-to-br dark:from-slate-900 dark:to-black md:px-8'>
      <Logo className='hidden md:block' />
      <div className='flex w-full justify-between gap-4 md:w-auto md:justify-start'>
        <div className='hidden gap-4 md:flex'>
          {routeMock.map(({ href, title }) => (
            <Link
              href={href}
              key={title}
              className={cn(
                "p-2 font-medium transition-colors hover:text-primary",
                isNavActive(href, pathname) && "text-primary"
              )}
            >
              {title}
            </Link>
          ))}
        </div>
        <Button
          isIconOnly
          variant='light'
          radius='sm'
          className='inline-flex md:hidden'
          onPress={() => setShowMenu(true)}
        >
          <Menu size={24} />
        </Button>

        {showMenu && <MobileMenu visible={showMenu} onClose={() => setShowMenu(false)} user={user} />}
        <Logo className='block md:hidden' />
        <div className='flex gap-4'>
          <ThemeSwitcher />
          {user && (
            <>
              <CartMenu />
              <Button isIconOnly variant='light' className='md:hidden' as={Link} href={APP_ROUTES.CARTS}>
                <Badge content={cart?.length || 0} color='danger'>
                  <ShoppingCart size={24} />
                </Badge>
              </Button>
            </>
          )}

          {user && <UserMenu user={user} />}
        </div>
        {!user && (
          <div className='hidden gap-4 md:flex'>
            <Button as={Link} href={APP_ROUTES.LOGIN} color='primary' radius='sm' className='flex-1'>
              Login
            </Button>
            <Button as={Link} href={APP_ROUTES.REGISTER} variant='flat' radius='sm' className='flex-1'>
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar
