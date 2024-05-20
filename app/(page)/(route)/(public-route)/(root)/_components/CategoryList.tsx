import { CategoryCard } from "@/(page)/(route)/_components"
import { ICategory } from "@/_lib/interfaces"
import React from "react"

type Props = {
  categories: ICategory[]
}

const CategoryList = ({ categories }: Props) => {
  return (
    <div className='space-y-4'>
      <h3 className='text-2xl font-semibold'>Categories</h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'>
        {categories.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
