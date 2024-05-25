import { ProductCard } from "@/(page)/(route)/_components"
import { IProduct } from "@/_lib/interfaces"
import React from "react"

type Props = {
  products: IProduct[]
}

const ProductList = ({ products }: Props) => {
  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        {products.length === 0 ? (
          <div className='flex h-20'>
            <p className='text-lg text-foreground-500'>No products found</p>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3'>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
