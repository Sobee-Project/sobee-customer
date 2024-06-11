import { CouponCard, ProductCard } from "@/(page)/(route)/_components"
import { fetchByCode } from "@/_actions"
import { ECouponApplyType } from "@/_lib/enums"
import { IProduct } from "@/_lib/interfaces"
import { redirect } from "next/navigation"
import React from "react"

const page = async ({ params }: any) => {
  const code = params.code
  const couponRes = await fetchByCode(code)

  if (!couponRes.success) {
    redirect("/" + couponRes.statusCode)
  }

  const coupon = couponRes.data!
  const products = (coupon.productApply as IProduct[]) || []

  return (
    <div className='mx-[5%] my-8 flex flex-col items-center gap-8'>
      <div className='max-w-lg'>
        <CouponCard coupon={coupon} />
      </div>
      {coupon.applyTo === ECouponApplyType.SPECIFIC && <h2 className='text-2xl font-semibold'>Applied products</h2>}
      {coupon.applyTo === ECouponApplyType.SPECIFIC && (
        <div className='w-full space-y-4'>
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
      )}
    </div>
  )
}

export default page
