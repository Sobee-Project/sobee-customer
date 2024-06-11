import { fetchBrandAndProducts, fetchCategoryAndProducts } from "@/_actions"
import { redirect } from "next/navigation"
import BrandAndProductsList from "./_components/BrandAndProductsList"

const page = async () => {
  const categoryAndProductsRes = await fetchBrandAndProducts()
  if (!categoryAndProductsRes.success) {
    return <div className='text-center text-xl'>{categoryAndProductsRes.message}</div>
  }

  const data = categoryAndProductsRes.data!

  return (
    <div className='space-y-4'>
      <BrandAndProductsList initialData={data} paginationRes={{ ...categoryAndProductsRes }} />
    </div>
  )
}

export default page
