export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    GET_ME: "/auth/me",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password"
  },

  USER: {
    CHANGE_AVATAR: "/user/avatar",
    UPDATE: "/user"
  },

  PRODUCT: {
    GET_PRODUCTS: "/product"
  },

  REVIEW: {
    GET_PRODUCT_REVIEWS: "/review/product/:id",
    GET_USER_REVIEWS: "/review/user/:id",
    CREATE_REVIEW: "/review",
    UPDATE_REVIEW: "/review/:id",
    DELETE_REVIEW: "/review/:id"
  },
  CATEGORY: {
    GET_CATEGORIES: "/category",
    GET_CATEGORY: "/category/:id"
  },
  BRAND: {
    GET_BRANDS: "/brand",
    GET_BRAND: "/brand/:id"
  },
  UPLOAD: {
    UPLOAD_FILE: "/upload",
    UPLOAD_URL: "/upload/url"
  },
  FAQ: {
    GET_FAQS: "/faq"
  },
  TERM: {
    GET_TERMS: "/term"
  },
  CARD: {
    CREATE: "/card",
    GET_CARDS: "/card/customer",
    DELETE_CARD: "/card/:id",
    SET_DEFAULT: "/card/set-default"
  },
  PAYMENT_ACCOUNT: {
    CREATE: "/payment-account",
    GET_PAYMENT_ACCOUNTS: "/payment-account/customer",
    DELETE_PAYMENT_ACCOUNT: "/payment-account/:id",
    SET_DEFAULT: "/payment-account/set-default"
  },
  ADDRESS: {
    CREATE: "/address",
    UPDATE: "/address/:id",
    GET_ADDRESSES: "/address/customer",
    DELETE_ADDRESS: "/address/:id",
    SET_DEFAULT: "/address/set-default"
  }
}
