"use client"
import { ProductCard } from "@/(page)/(route)/_components"
import { fetchAllProducts, fetchCategoryProducts, fetchProductById } from "@/_actions"
import { IPaginate, IProduct } from "@/_lib/interfaces"
import { Button, Spinner } from "@nextui-org/react"
import React, { useCallback, useEffect, useState } from "react"

type Props = {
  initialProducts: IProduct[]
  paginationRes: IPaginate
  slug: string
}

const CategoryProducts = ({ initialProducts, paginationRes: pagination, slug }: Props) => {
  const [products, setProducts] = useState(initialProducts)
  const [paginationRes, setPaginationRes] = useState<IPaginate>(pagination)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setProducts(initialProducts)
    setPaginationRes(pagination)
  }, [initialProducts, pagination])

  console.log({ paginationRes })

  const fetchMore = useCallback(async () => {
    if (!isFetching) {
      setIsFetching(true)
      const res = await fetchCategoryProducts(slug, {
        page: paginationRes.nextPage
      })
      if (res.success) {
        setProducts((prev) => [...prev, ...res.data!])
        setPaginationRes(res)
      }
      setIsFetching(false)
    }
  }, [isFetching, slug, paginationRes.nextPage])

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

      {paginationRes.hasNext && (
        <div className='flex justify-center'>
          <Button onClick={fetchMore} className='mt-4 self-center' isLoading={isFetching} disabled={isFetching}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryProducts
