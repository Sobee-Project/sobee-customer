import { CouponCard } from "@/(page)/(route)/_components"
import { ICoupon } from "@/_lib/interfaces"
import React from "react"

type Props = {
  coupons: ICoupon[]
}

const TodayCoupons = ({ coupons }: Props) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold'>Today coupons</h3>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]'>
        {coupons.map((coupon) => (
          <CouponCard coupon={coupon} key={coupon._id} />
        ))}
      </div>
    </div>
  )
}

export default TodayCoupons
