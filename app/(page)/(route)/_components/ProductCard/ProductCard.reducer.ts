import { EProductType } from "@/_lib/enums"

export type IProductCardState = {
  selectedVariants: Record<string, string>
  quantity: number
}

export const PRODUCT_CARD_ACTIONS = {
  SET_SELECTED_VARIANTS: "SET_SELECTED_VARIANTS",
  SET_QUANTITY: "SET_QUANTITY"
}
export type IProductCardAction = {
  type: keyof typeof PRODUCT_CARD_ACTIONS
  payload: any
}

export const productCardInitialState: IProductCardState = {
  quantity: 1,
  selectedVariants: {
    size: "",
    color: ""
  }
}

export const productCardReducer = (state: IProductCardState, action: IProductCardAction): IProductCardState => {
  switch (action.type) {
    case PRODUCT_CARD_ACTIONS.SET_SELECTED_VARIANTS:
      const selectedVariants = state.selectedVariants
      const key = Object.keys(action.payload)[0]
      const value = Object.values(action.payload)[0] as string
      if (selectedVariants[key]) {
        if (selectedVariants[key].includes(value)) {
          return {
            ...state,
            selectedVariants: {
              ...selectedVariants,
              [key]: value
            }
          }
        }
      }

      return {
        ...state,
        selectedVariants: {
          ...selectedVariants,
          [key]: value
        }
      }

    case PRODUCT_CARD_ACTIONS.SET_QUANTITY:
      if (action.payload < 1) return state
      return { ...state, quantity: action.payload }
    default:
      return state
  }
}
