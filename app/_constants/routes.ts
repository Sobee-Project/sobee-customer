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
  ORDERS: {
    INDEX: "/order",
    ID: "/order/:id",
    CONTACT: "/order/:id/contact"
  },
  COUPONS: {
    INDEX: "/coupon"
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
  PROFILE: "/profile",
  CONTACT: "/contact"
}
