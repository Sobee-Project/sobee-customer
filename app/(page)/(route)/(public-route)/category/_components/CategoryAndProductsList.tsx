"use client"
import { fetchCategoryAndProducts } from "@/_actions"
import { ICategory, IPaginate, IProduct } from "@/_lib/interfaces"
import { Button, Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { useCallback, useEffect, useState } from "react"

const CategoryAndProducts = dynamic(() => import("./CategoryAndProducts"), {
  ssr: false,
  loading: () => <Spinner />
})

type Props = {
  initialData: ({
    products: IProduct[]
  } & ICategory)[]
  paginationRes: IPaginate
}

const CategoryAndProductsList = ({ initialData, paginationRes: pagination }: Props) => {
  const [products, setProducts] = useState(initialData)
  const [paginationRes, setPaginationRes] = useState<IPaginate>(pagination)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setProducts(initialData)
    setPaginationRes(pagination)
  }, [initialData, pagination])

  const fetchMore = useCallback(async () => {
    if (!isFetching) {
      setIsFetching(true)
      const res = await fetchCategoryAndProducts({
        page: paginationRes.nextPage
      })
      if (res.success) {
        setProducts((prev) => [...prev, ...res.data!])
        setPaginationRes(res)
      }
      setIsFetching(false)
    }
  }, [paginationRes.nextPage, isFetching])

  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        {products.length === 0 ? (
          <div className='flex h-20'>
            <p className='text-lg text-foreground-500'>No categories found</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {products.map((product) => (
              <CategoryAndProducts key={product._id} {...product} />
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

export default CategoryAndProductsList
