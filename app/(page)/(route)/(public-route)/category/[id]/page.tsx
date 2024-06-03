import { ProductList } from "@/(page)/(route)/_components"
import { fetchCategoryProducts } from "@/_actions"
import { IProduct } from "@/_lib/interfaces"
import { redirect } from "next/navigation"
import React from "react"
import CategoryProducts from "./components/CategoryProducts"

const page = async ({ params }: any) => {
  const id = params.id
  const categoryRes = await fetchCategoryProducts(id)
  if (!categoryRes.success) {
    redirect("/" + categoryRes.statusCode)
  }

  const products = categoryRes.data || ([] as IProduct[])

  return <CategoryProducts initialProducts={products} paginationRes={{ ...categoryRes }} slug={id} />
}

export default page
