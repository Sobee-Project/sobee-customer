import { APP_ROUTES } from "@/_constants"
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

export const myOrdersMock = [
  {
    title: "All",
    href: APP_ROUTES.USER.ORDERS.INDEX
  },
  {
    title: "Pending",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=pending"
  },
  {
    title: "Processing",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=processing"
  },
  {
    title: "Delivered",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=delivered"
  },
  {
    title: "Cancelled",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=cancelled"
  },
  {
    title: "Returned",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=returned"
  },
  {
    title: "Refunded",
    href: APP_ROUTES.USER.ORDERS.INDEX + "?status=refunded"
  }
]

export const userRouteMock = [
  {
    section: "My account",
    items: myAccountMock,
    href: APP_ROUTES.USER.ACCOUNT.PROFILE,
    icon: UserRoundCog
  },
  {
    section: "My orders",
    href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "all"),
    icon: Shirt,
    items: [
      {
        title: "All",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "all")
      },
      {
        title: "Pending",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "pending")
      },
      {
        title: "Processing",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "processing")
      },
      {
        title: "Delivered",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "delivered")
      },
      {
        title: "Cancelled",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "cancelled")
      },
      {
        title: "Returned",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "returned")
      },
      {
        title: "Refunded",
        href: APP_ROUTES.USER.ORDERS.STATUS.replace(":status", "refunded")
      }
    ]
  },
  {
    section: "Settings",
    items: mySettingsMock,
    href: APP_ROUTES.USER.SETTINGS.NOTIFICATION,
    icon: Settings
  },

  {
    section: "Notifications",
    href: APP_ROUTES.USER.NOTIFICATIONS.ORDER,
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
