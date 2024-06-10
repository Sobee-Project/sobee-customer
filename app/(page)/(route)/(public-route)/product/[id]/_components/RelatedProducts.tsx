"use client"
import { ProductCard } from "@/(page)/(route)/_components"
import { fetchRelatedProducts } from "@/_actions"
import { IProduct } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useInView } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

type Props = {
  productId: string
}

const RelatedProducts = ({ productId }: Props) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView && !isFetching) {
      ;(async function () {
        setIsFetching(true)
        const res = await fetchRelatedProducts(productId)
        if (res.success) {
          setProducts(res.data!)
        }
        setIsFetching(false)
      })()
    }
  }, [inView, isFetching, productId])

  return (
    <div className='my-8 space-y-4'>
      <h3 className='text-2xl font-semibold'>Related Products</h3>
      {isFetching ? (
        <Spinner />
      ) : (
        <div ref={ref}>
          {products.length === 0 ? (
            <div className='flex h-20'>
              <p className='text-lg text-foreground-500'>No related products found</p>
            </div>
          ) : (
            <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3'>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RelatedProducts
