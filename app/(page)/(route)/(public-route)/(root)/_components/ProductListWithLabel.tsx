"use client"
import { ProductCard } from "@/(page)/(route)/_components"
import { IProduct } from "@/_lib/interfaces"
import React from "react"

type Props = {
  label: string
  products: IProduct[]
}

const ProductListWithLabel = ({ label, products }: Props) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold'>{label}</h3>
      {products.length === 0 ? (
        <div className='flex h-20'>
          <p className='text-lg text-slate-400'>No products found</p>
        </div>
      ) : (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3'>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListWithLabel
