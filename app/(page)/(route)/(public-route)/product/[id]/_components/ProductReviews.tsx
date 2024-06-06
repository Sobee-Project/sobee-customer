"use client"
import { ReviewCard } from "@/(page)/(route)/_components"
import { fetchProductReviews } from "@/_actions"
import { IPaginate, IReview, IUser } from "@/_lib/interfaces"
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react"
import React, { useCallback, useEffect } from "react"

type Props = {
  reviews: IReview[]
  paginationRes: IPaginate
  productId: string
}

const ProductReviews = ({ reviews: initialReviews, paginationRes: pagination, productId }: Props) => {
  const [reviews, setReviews] = React.useState<IReview[]>(initialReviews)
  const [paginationRes, setPaginationRes] = React.useState<IPaginate>(pagination)
  const [isFetching, setIsFetching] = React.useState(false)
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null)

  useEffect(() => {
    setReviews(initialReviews)
    setPaginationRes(pagination)
  }, [initialReviews, pagination])

  const onFilterChange = async (rating: number | null) => {
    if (!isFetching) {
      setIsFetching(true)
      const res = await fetchProductReviews(productId, {
        page: paginationRes.nextPage,
        rating
      })
      if (res.success) {
        setReviews((prev) => res.data!)
        setPaginationRes(res)
      }
      setIsFetching(false)
    }
  }

  const fetchMore = useCallback(async () => {
    if (!isFetching) {
      setIsFetching(true)
      const res = await fetchProductReviews(productId, {
        page: paginationRes.nextPage,
        rating: selectedRating
      })
      if (res.success) {
        setReviews((prev) => [...prev, ...res.data!])
        setPaginationRes(res)
      }
      setIsFetching(false)
    }
  }, [isFetching, productId, paginationRes.nextPage, selectedRating])

  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1)

  return (
    <div className='my-8'>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='mb-4 flex-1 text-xl font-semibold'>
          Product Reviews (&#9733; {avgRating}/5 · {reviews.length} reviews)
        </h2>
        <Select
          size='sm'
          label='Filter by'
          disallowEmptySelection
          selectedKeys={[selectedRating ? String(selectedRating) : "0"]}
          onChange={async (e) => {
            const r = e.target.value
            const val = r === "0" ? null : Number(r)
            await onFilterChange(val)
            setSelectedRating(val)
          }}
          className='w-1/4'
        >
          <SelectItem key={"0"} value={"0"}>
            All
          </SelectItem>
          {
            ["1", "2", "3", "4", "5"].map((i) => (
              <SelectItem key={i} value={i} textValue={`${i} stars`}>
                {Array.from({ length: Number(i) }).map((_, i) => (
                  <span key={i} className='text-yellow-500'>
                    &#9733;
                  </span>
                ))}
              </SelectItem>
            )) as any
          }
        </Select>
      </div>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <div className='space-y-4'>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}

      {isFetching && <Spinner />}

      {paginationRes.hasNext && (
        <div className='flex justify-center'>
          <Button onClick={() => fetchMore()} className='mt-4 self-center' isLoading={isFetching} disabled={isFetching}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductReviews
