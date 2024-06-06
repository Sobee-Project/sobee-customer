import { APP_ROUTES } from "@/_constants"
import { EOrderStatus } from "@/_lib/enums"
import { Bell, Settings, Shirt, UserRoundCog } from "lucide-react"

export const myAccountMock = [
  {
    title: "Profile",
    href: APP_ROUTES.USER.ACCOUNT.PROFILE
  },
  {
    title: "Favorite",
    href: APP_ROUTES.USER.ACCOUNT.FAVORITE
  },
  {
    title: "Bank Account",
    href: APP_ROUTES.USER.ACCOUNT.BANK_ACCOUNT
  },
  {
    title: "Address",
    href: APP_ROUTES.USER.ACCOUNT.ADDRESS
  },
  {
    title: "Change Password",
    href: APP_ROUTES.USER.ACCOUNT.CHANGE_PASSWORD
  }
]

export const mySettingsMock = [
  {
    title: "Notification",
    href: APP_ROUTES.USER.SETTINGS.NOTIFICATION
  },
  {
    title: "Danger",
    href: APP_ROUTES.USER.SETTINGS.DANGER
  }
]

export const userRouteMock = [
  {
    section: "My account",
    items: myAccountMock,
    href: APP_ROUTES.USER.ACCOUNT.INDEX,
    icon: UserRoundCog
  },
  {
    section: "My orders",
    href: APP_ROUTES.USER.ORDERS.INDEX,
    icon: Shirt,
    items: [
      {
        title: "ALL",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "ALL")
      },
      ...Object.values(EOrderStatus).map((status) => ({
        title: status,
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", encodeURIComponent(status))
      }))
    ]
  },
  {
    section: "Settings",
    items: mySettingsMock,
    href: APP_ROUTES.USER.SETTINGS.INDEX,
    icon: Settings
  },

  {
    section: "Notifications",
    href: APP_ROUTES.USER.NOTIFICATIONS.INDEX,
    icon: Bell,
    items: [
      {
        title: "Order updates",
        href: APP_ROUTES.USER.NOTIFICATIONS.ORDER
      },
      {
        title: "Promotion updates",
        href: APP_ROUTES.USER.NOTIFICATIONS.PROMOTION
      },
      {
        title: "System updates",
        href: APP_ROUTES.USER.NOTIFICATIONS.SYSTEM
      }
    ]
  }
]
