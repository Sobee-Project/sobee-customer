export const APP_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  HOME: "/",
  PRODUCTS: {
    INDEX: "/product",
    ID: "/product/:id"
  },
  CATEGORIES: {
    INDEX: "/category",
    ID: "/category/:id"
  },
  BRANDS: {
    INDEX: "/brand",
    ID: "/brand/:id"
  },
  CARTS: "/cart",
  CHECKOUT: "/checkout",

  COUPONS: {
    INDEX: "/coupon",
    ID: "/coupon/:id"
  },
  FLASH_SALES: {
    INDEX: "/flash-sale",
    ID: "/flash-sale/:id"
  },
  NOTIFICATIONS: {
    INDEX: "/notification"
  },
  FAQS: "/faq",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  USER: {
    ACCOUNT: {
      INDEX: "/user/account",
      PROFILE: "/user/account/profile",
      FAVORITE: "/user/account/favorite",
      BANK_ACCOUNT: "/user/account/bank-account",
      ADDRESS: "/user/account/address",
      CHANGE_PASSWORD: "/user/account/change-password"
    },
    SETTINGS: {
      INDEX: "/user/settings",
      NOTIFICATION: "/user/settings/notification",
      DANGER: "/user/settings/danger"
    },
    NOTIFICATIONS: {
      INDEX: "/user/notification",
      ORDER: "/user/notification/order",
      PROMOTION: "/user/notification/promotion",
      SYSTEM: "/user/notification/system"
    },
    ORDERS: {
      INDEX: "/user/order",
      ID: "/user/order/:id",
      CONTACT: "/user/order/:id/contact",
      STATUS: "/user/order/:status"
    }
  },
  CONTACT: "/contact",
  ORDERS: {
    INDEX: "/order",
    ID: "/order/:id"
  },
  CHAT: {
    INDEX: "/chat",
    ID: "/chat/:id"
  }
}
