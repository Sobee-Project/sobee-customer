"use client"
import { ProductCard } from "@/(page)/(route)/_components"
import { fetchFavoriteProducts } from "@/_actions"
import { IProduct } from "@/_lib/interfaces"
import { useFavoriteStore } from "@/_store"
import { Divider } from "@nextui-org/react"
import React, { useEffect } from "react"

const Page = () => {
  const { favoriteProducts } = useFavoriteStore()

  return (
    <div>
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Favorites</h3>
        <Divider />
        {favoriteProducts.length === 0 ? (
          <div className='flex h-20'>
            <p className='text-lg text-foreground-500'>No favorite products found</p>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3'>
            {favoriteProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
