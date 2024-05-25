"use client"
import { IReview, IUser } from "@/_lib/interfaces"
import { Avatar } from "@nextui-org/react"
import { format } from "date-fns"
import Image from "next/image"
import React from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import RatingStars from "./RatingStarts"

type Props = {
  review: IReview
}

const ReviewCard = ({ review }: Props) => {
  const customer = review.customer as IUser
  return (
    <div className='flex gap-4'>
      <Avatar src={customer.avatar} />
      <div className='space-y-1'>
        <p className='text-sm'>{customer.name}</p>
        <RatingStars initialRating={review.rating} readOnly starClassName='text-base' />
        <p className='text-xs text-foreground-500'>{format(new Date(review.createdAt!), "dd/MM/yyyy 'at' HH:mm")}</p>
        <p>{review.content}</p>
        <div>
          {review.assets.length > 0 && (
            <div className='flex gap-1'>
              <PhotoProvider loop maskOpacity={0.5}>
                {review.assets.map((asset) => (
                  <PhotoView key={asset} src={asset}>
                    <Image
                      key={asset}
                      src={asset}
                      alt='Review asset'
                      className='size-20 cursor-pointer rounded border'
                      width={80}
                      height={80}
                    />
                  </PhotoView>
                ))}
              </PhotoProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
