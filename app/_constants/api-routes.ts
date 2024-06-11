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
    GET_ALL_PRODUCTS: "/product",
    GET_DRAFT_PRODUCTS: "/product/draft",
    GET_POPULAR_PRODUCTS: "/product/popular",
    GET_BEST_SELLER_PRODUCTS: "/product/best-seller",
    GET_RELATED_PRODUCTS: "/product/:id/related",
    GET_RECOMMEND_PRODUCTS: "/product/:id/recommend",
    GET_DISCOUNT_PRODUCTS: "/product/discount",
    GET_FEATURED_PRODUCTS: "/product/featured",
    GET_PRODUCT: "/product/:id",
    GET_COLORS: "/product/color",
    GET_CUSTOMER_FAVORITE_PRODUCTS: "/favorite",
    TOGGLE_FAVORITE_PRODUCT: "/favorite/:id/toggle",
    CLEAR_FAVORITE_PRODUCTS: "/favorite/clear"
  },

  REVIEW: {
    GET_PRODUCT_REVIEWS: "/review/product/:id",
    GET_USER_REVIEWS: "/review/user/:id",
    CREATE_REVIEW: "/review",
    UPDATE_REVIEW: "/review/:id",
    DELETE_REVIEW: "/review/:id",
    LIKE_REVIEW: "/review/:id/like",
    LIKE_REVIEW_REPLY: "/review/:id/like-reply",
    GET_REVIEW: "/review/customer/product/:id"
  },
  CATEGORY: {
    GET_CATEGORIES: "/category",
    GET_CATEGORY: "/category/:id",
    GET_CATEGORY_PRODUCTS: "/category/:id/product",
    GET_CATEGORY_AND_PRODUCTS: "/category/product"
  },
  BRAND: {
    GET_BRANDS: "/brand",
    GET_BRAND: "/brand/:id",
    GET_BRAND_PRODUCTS: "/brand/:id/product",
    GET_BRAND_AND_PRODUCTS: "/brand/product"
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
  },
  COUPONS: {
    GET_COUPONS: "/coupon",
    GET_TODAY_COUPONS: "/coupon/today",
    APPLY_COUPON: "/coupon/validate",
    GET_BY_CODE: "/coupon/code/:code"
  },
  QUESTION: {
    GET_PRODUCT_QUESTIONS: "/question/product/:id",
    CREATE_QUESTION: "/question",
    UPDATE_QUESTION: "/question/:id",
    DELETE_QUESTION: "/question/:id",
    LIKE_QUESTION: "/question/:id/like",
    LIKE_QUESTION_REPLY: "/question/:id/like-reply"
  },
  ORDER: {
    CREATE: "/order",
    GET_ORDERS: "/order/customer",
    GET_ORDER: "/order/:id",
    ADD_ORDER_ITEM: "/order/item",
    UPDATE_ORDER_ITEM_QUANTITY: "/order/item/:id/quantity",
    DELETE_ORDER_ITEM: "/order/item/:id",
    CANCEL_ORDER: "/order/:id/cancel",
    GET_ORDER_ITEMS: "/order/item",
    CANCLE_ORDER: "/order/:id/status/cancel",
    RE_ORDER: "/order/:id/reorder"
  },
  PAYMENT_METHODS: {
    GET_PAYMENT_METHODS: "/payment-method"
  },
  REFUND_POLICY: {
    GET_ALL: "/refund-policy"
  },

  CHAT: {
    CREATE_ROOM: "/chat-room",
    GET_ROOM: "/chat-room/:id"
  }
}
