import { BrandCard } from "@/(page)/(route)/_components"
import { IBrand } from "@/_lib/interfaces"
import React from "react"

type Props = {
  brands: IBrand[]
}

const BrandList = ({ brands }: Props) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold'>Brands</h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'>
        {brands.map((brand) => (
          <BrandCard brand={brand} key={brand._id} />
        ))}
      </div>
    </div>
  )
}

export default BrandList
