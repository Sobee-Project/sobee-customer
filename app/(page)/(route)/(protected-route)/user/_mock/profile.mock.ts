import { APP_ROUTES } from "@/_constants"

export const myAccountMock = [
  {
    title: "Profile",
    href: APP_ROUTES.USER.ACCOUNT.PROFILE
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
    href: APP_ROUTES.USER.ACCOUNT.PROFILE
  },
  {
    section: "Settings",
    items: mySettingsMock,
    href: APP_ROUTES.USER.SETTINGS.INDEX
  },
  {
    section: "My orders",
    href: APP_ROUTES.USER.ORDERS.INDEX,
    items: undefined
  },
  {
    section: "Notifications",
    href: APP_ROUTES.USER.NOTIFICATIONS.INDEX,
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
