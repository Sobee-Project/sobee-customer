export type IFilterMenuState = {
  priceRange: number[]
  categories: string[]
  colors: string[]
  sizes: string[]
  ratings: string[]
  sortBy: string
  isOnSale: boolean
  keyword: string
}

const FILTER_MENU_ACTIONS = {
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_COLORS: "SET_COLORS",
  SET_SIZES: "SET_SIZES",
  SET_RATINGS: "SET_RATINGS",
  SET_SORT_BY: "SET_SORT_BY",
  SET_IS_ON_SALE: "SET_IS_ON_SALE",
  SET_KEYWORD: "SET_KEYWORD",
  RESET_FILTER: "RESET_FILTER"
}
export type IFilterMenuAction = {
  type: keyof typeof FILTER_MENU_ACTIONS
  payload?: any
}

export const filterMenuInitialState: IFilterMenuState = {
  categories: ["All"],
  colors: ["All"],
  priceRange: [1, 5000],
  sizes: ["All"],
  ratings: ["All"],
  sortBy: "createdAt-desc",
  isOnSale: false,
  keyword: ""
}

export const filterMenuReducer = (state: IFilterMenuState, action: IFilterMenuAction): IFilterMenuState => {
  const ignoreActions = ["SET_SORT_BY", "RESET_FILTER", "SET_IS_ON_SALE", "SET_KEYWORD"]
  const payload = action.payload
  const noAll = !ignoreActions.includes(action.type) ? payload.filter((v: string) => v !== "All") : payload
  switch (action.type) {
    case FILTER_MENU_ACTIONS.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload }

    case FILTER_MENU_ACTIONS.SET_CATEGORIES:
      if (noAll.length === 0) return { ...state, categories: ["All"] }
      if (payload[payload.length - 1] === "All") return { ...state, categories: ["All"] }
      return { ...state, categories: noAll }

    case FILTER_MENU_ACTIONS.SET_COLORS:
      if (noAll.length === 0) return { ...state, colors: ["All"] }
      if (payload[payload.length - 1] === "All") return { ...state, colors: ["All"] }
      return { ...state, colors: noAll }

    case FILTER_MENU_ACTIONS.SET_SIZES:
      if (noAll.length === 0) return { ...state, sizes: ["All"] }
      if (payload[payload.length - 1] === "All") return { ...state, sizes: ["All"] }
      return { ...state, sizes: noAll }

    case FILTER_MENU_ACTIONS.SET_RATINGS:
      if (noAll.length === 0) return { ...state, ratings: ["All"] }
      if (payload[payload.length - 1] === "All") return { ...state, ratings: ["All"] }
      return { ...state, ratings: noAll }

    case FILTER_MENU_ACTIONS.SET_SORT_BY:
      return { ...state, sortBy: action.payload }

    case FILTER_MENU_ACTIONS.SET_IS_ON_SALE:
      return { ...state, isOnSale: action.payload }

    case FILTER_MENU_ACTIONS.SET_KEYWORD:
      return { ...state, keyword: action.payload }

    case FILTER_MENU_ACTIONS.RESET_FILTER:
      return { ...filterMenuInitialState, sortBy: state.sortBy }

    default:
      return state
  }
}
