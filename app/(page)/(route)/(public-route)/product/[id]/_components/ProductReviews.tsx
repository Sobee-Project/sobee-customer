"use client"
import { ReviewCard } from "@/(page)/(route)/_components"
import { IReview, IUser } from "@/_lib/interfaces"
import { Select, SelectItem } from "@nextui-org/react"
import React, { useEffect } from "react"

type Props = {
  reviews: IReview[]
}

const ProductReviews = ({ reviews }: Props) => {
  const [selectedRating, setSelectedRating] = React.useState<string>("0")

  const [filteredReviews, setFilteredReviews] = React.useState<IReview[]>(reviews)

  useEffect(() => {
    setFilteredReviews(reviews.filter((review) => selectedRating === "0" || review.rating === Number(selectedRating)))
  }, [reviews])

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
          selectedKeys={[selectedRating]}
          onChange={(e) => {
            console.log(e.target.value)
            setSelectedRating(e.target.value)
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
      {/* {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className='mb-4'>
            <h3 className='font-semibold'>{review.title}</h3>
          </div>
        ))
      )} */}
      <div className='space-y-4'>
        {[0, 1, 2, 3, 4].map((i) => (
          <ReviewCard
            key={i}
            review={{
              _id: "1",
              assets: [
                "https://res.cloudinary.com/dtfkou1of/image/upload/v1716173396/sobee-storage/image/product/asset/qz47lxybfv9qy46q6s72.jpg",
                "https://res.cloudinary.com/dtfkou1of/image/upload/v1716142861/sobee-storage/image/product/asset/p5uctian61lykr7btyep.jpg"
              ],
              content: "This is a review",
              rating: 5,
              createdAt: new Date().toUTCString(),
              customer: {
                avatar: "",
                name: "John Doe"
              } as IUser
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductReviews
