import { ProductList } from "@/(page)/(route)/_components"
import { fetchBrandProducts } from "@/_actions"
import { IProduct } from "@/_lib/interfaces"
import { redirect } from "next/navigation"
import React from "react"
import BrandProducts from "./components/BrandProducts"

const page = async ({ params }: any) => {
  const id = params.id
  const categoryRes = await fetchBrandProducts(id)
  if (!categoryRes.success) {
    redirect("/" + categoryRes.statusCode)
  }

  const products = categoryRes.data || ([] as IProduct[])

  return <BrandProducts initialProducts={products} paginationRes={{ ...categoryRes }} slug={id} />
}

export default page
