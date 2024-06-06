import { createOrderItem, fetchOrderItems, removeOrderItem, updateOrderItemQuantity } from "@/_actions"
import { IOrderItem, IProduct } from "@/_lib/interfaces"
import toast from "react-hot-toast"
import { create } from "zustand"

interface CartStore {
  orderItems: IOrderItem[]
  loadOrderItems: () => Promise<void>
  isInCart: (productId: string) => boolean
  addOrderItem: (orderItem: IOrderItem) => Promise<void>
  removeOrderItem: (orderItemId: string) => Promise<void>
  updateOrderItemQuantity: (orderItemId: string, quantity: number) => Promise<void>
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  orderItems: [],
  isInCart: (productId) => get().orderItems.some((item) => (item.product as IProduct)._id === productId),
  loadOrderItems: async () => {
    const res = await fetchOrderItems()
    if (res.success) {
      set({ orderItems: res.data })
    } else {
      toast.error(res.message)
    }
  },
  addOrderItem: async (orderItem) => {
    const res = await createOrderItem(orderItem)
    if (res.success) {
      toast.success(res.message)
      const existingItem = get().orderItems.find((item) => {
        const product = item.product as IProduct
        if (product._id === orderItem.product) {
          if (product.isVariation) {
            const existVariation = get().orderItems.find(
              (v) => v.size === orderItem.size && v.color === orderItem.color
            )
            if (existVariation) {
              return true
            }
            return false
          }
          return true
        }
        return false
      })
      if (existingItem) {
        return set({ orderItems: get().orderItems.map((item) => (item._id === res.data!._id ? res.data! : item)) })
      } else {
        return set({ orderItems: [...get().orderItems, res.data!] })
      }
    } else {
      toast.error(res.message)
    }
  },
  removeOrderItem: async (orderItemId) => {
    const res = await removeOrderItem(orderItemId)
    if (res.success) {
      toast.success("Item removed from cart")
      set({ orderItems: get().orderItems.filter((item) => item._id !== orderItemId) })
    } else {
      toast.error(res.message)
    }
  },
  updateOrderItemQuantity: async (orderItemId, quantity) => {
    const res = await updateOrderItemQuantity(orderItemId, quantity)
    if (res.success) {
      toast.success("Item quantity updated")
      set({ orderItems: get().orderItems.map((item) => (item._id === orderItemId ? res.data! : item)) })
    } else {
      toast.error(res.message)
    }
  },
  clearCart: () => set({ orderItems: [] })
}))
