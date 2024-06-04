import { clearFavoriteProducts, fetchFavoriteProducts, toggleFavorite } from "@/_actions"
import { IProduct } from "@/_lib/interfaces"
import toast from "react-hot-toast"
import { create } from "zustand"

interface FavoriteStore {
  favoriteProducts: IProduct[]
  loadFavoriteProducts: () => Promise<void>
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string) => Promise<void>
  clearFavorite: () => Promise<void>
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favoriteProducts: [],
  loadFavoriteProducts: async () => {
    const res = await fetchFavoriteProducts()
    if (res.success) {
      set({ favoriteProducts: res.data! })
    } else {
      toast.error(res.message)
    }
  },
  isFavorite: (productId) => get().favoriteProducts.some((product) => product._id === productId),
  toggleFavorite: async (productId) => {
    const res = await toggleFavorite(productId)
    if (res.success) {
      set({ favoriteProducts: res.data! })
    } else {
      toast.error(res.message)
    }
  },
  clearFavorite: async () => {
    const res = await clearFavoriteProducts()
    if (res.success) {
      set({ favoriteProducts: [] })
    } else {
      toast.error(res.message)
    }
  }
}))
