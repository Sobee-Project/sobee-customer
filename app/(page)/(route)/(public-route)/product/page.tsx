import { fetchAllCategories, fetchAllColors, fetchAllProducts } from "@/_actions"
import { ICategory, IProduct } from "@/_lib/interfaces"
import React from "react"
import { ProductList } from "../../_components"
import { FilterMenu } from "./_components"

const page = async ({ searchParams }: any) => {
  let categories = [] as ICategory[]
  let colors = [] as string[]
  let products = [] as IProduct[]

  const categoriesPromise = fetchAllCategories()
  const colorsPromise = fetchAllColors()
  const productsPromise = fetchAllProducts(searchParams as any)

  const [productRes, categoriesRes, colorsRes] = await Promise.all([productsPromise, categoriesPromise, colorsPromise])

  if (productRes.success) products = productRes.data!
  if (categoriesRes.success) categories = categoriesRes.data!
  if (colorsRes.success) colors = colorsRes.data!
  return (
    <>
      <FilterMenu categories={categories} colors={colors} />
      <ProductList initialProducts={products} searchParams={searchParams} paginationRes={{ ...productRes }} />
    </>
  )
}

export default page
