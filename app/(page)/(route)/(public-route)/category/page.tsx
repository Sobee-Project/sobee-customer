import { fetchCategoryAndProducts } from "@/_actions"
import { redirect } from "next/navigation"
import CategoryAndProducts from "./_components/CategoryAndProducts"
import CategoryAndProductsList from "./_components/CategoryAndProductsList"

const page = async () => {
  const categoryAndProductsRes = await fetchCategoryAndProducts()
  if (!categoryAndProductsRes.success) {
    redirect("/" + categoryAndProductsRes.statusCode)
  }

  const data = categoryAndProductsRes.data!

  return (
    <div className='space-y-4'>
      <CategoryAndProductsList initialData={data} paginationRes={{ ...categoryAndProductsRes }} />
    </div>
  )
}

export default page
