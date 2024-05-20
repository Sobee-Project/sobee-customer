import { APP_ROUTES } from "@/_constants"
import { Settings, Shirt, ShoppingBag, UserRound } from "lucide-react"

export const routeMock = [
  {
    title: "Home",
    href: APP_ROUTES.HOME
  },
  {
    title: "Products",
    href: APP_ROUTES.PRODUCTS.INDEX
  },
  {
    title: "Categories",
    href: APP_ROUTES.CATEGORIES.INDEX
  },
  {
    title: "Brands",
    href: APP_ROUTES.BRANDS.INDEX
  }
]

export const accountRouteMock = [
  {
    title: "Login",
    href: APP_ROUTES.LOGIN
  },
  {
    title: "Register",
    href: APP_ROUTES.REGISTER
  },
  {
    title: "Forgot Password",
    href: APP_ROUTES.FORGOT_PASSWORD
  }
]

export const otherRouteMock = [
  { title: "FAQ", href: APP_ROUTES.FAQS },
  {
    title: "Terms & Conditions",
    href: APP_ROUTES.TERMS_AND_CONDITIONS
  },
  {
    title: "Contact Us",
    href: APP_ROUTES.CONTACT
  }
]

export const routeMobileMock = routeMock.concat(otherRouteMock)

export const userRouteMock = [
  {
    title: "Profile",
    href: APP_ROUTES.USER.ACCOUNT.PROFILE,
    icon: UserRound
  },
  {
    title: "My Orders",
    href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "all"),
    icon: Shirt
  },
  {
    title: "Settings",
    href: APP_ROUTES.USER.SETTINGS.NOTIFICATION,
    icon: Settings
  }
]
