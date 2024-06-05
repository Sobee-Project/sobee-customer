import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchBestSellerProducts,
  fetchDiscountProducts,
  fetchFeaturedProducts,
  fetchPopularProducts,
  fetchTodayCoupons
} from "@/_actions"
import { IBrand, ICategory, ICoupon, IProduct } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { ProductList } from "../../_components"
import {
  Campaign,
  ProductListWithLabel,
  SectionClientSay,
  SectionHero,
  SectionHowItWork,
  SectionPromo,
  TodayCoupons
} from "./_components"

const CategoryList = dynamic(() => import("./_components/CategoryList"), {
  loading: () => <Spinner />,
  ssr: false
})

const BrandList = dynamic(() => import("./_components/BrandList"), {
  loading: () => <Spinner />,
  ssr: false
})

const page = async () => {
  let publishedProducts = [] as IProduct[]
  let popularProducts = [] as IProduct[]
  let featuredProducts = [] as IProduct[]
  let bestSellerProducts = [] as IProduct[]
  let discountProducts = [] as IProduct[]
  let categories = [] as ICategory[]
  let brands = [] as IBrand[]
  let coupons = [] as ICoupon[]

  const publishedProductsPromise = fetchAllProducts()
  const popularProductsPromise = fetchPopularProducts()
  const featuredProductsPromise = fetchFeaturedProducts()
  const bestSellerProductsPromise = fetchBestSellerProducts()
  const discountProductsPromise = fetchDiscountProducts()
  const categoriesPromise = fetchAllCategories()
  const brandsPromise = fetchAllBrands()
  const couponsPromise = fetchTodayCoupons()

  const [
    publishedProductsRes,
    popularProductsRes,
    featuredProductsRes,
    bestSellerProductsRes,
    discountProductsRes,
    categoriesRes,
    brandsRes,
    couponsRes
  ] = await Promise.all([
    publishedProductsPromise,
    popularProductsPromise,
    featuredProductsPromise,
    bestSellerProductsPromise,
    discountProductsPromise,
    categoriesPromise,
    brandsPromise,
    couponsPromise
  ])

  if (publishedProductsRes.success) publishedProducts = publishedProductsRes.data!
  if (popularProductsRes.success) popularProducts = popularProductsRes.data!
  if (featuredProductsRes.success) featuredProducts = featuredProductsRes.data!
  if (bestSellerProductsRes.success) bestSellerProducts = bestSellerProductsRes.data!
  if (discountProductsRes.success) discountProducts = discountProductsRes.data!
  if (categoriesRes.success) categories = categoriesRes.data!
  if (brandsRes.success) brands = brandsRes.data!
  if (couponsRes.success) coupons = couponsRes.data!

  const listProductsWithLabel = [
    {
      label: "Best Seller",
      products: bestSellerProducts
    },
    {
      label: "Discount Products",
      products: discountProducts
    },
    {
      label: "Featured Products",
      products: featuredProducts
    }
  ]

  return (
    <div className='mb-24 lg:mb-32'>
      <SectionHero />
      {/* <Campaign /> */}
      <div className='mx-[5%] my-4 space-y-4 md:mx-[10%]'>
        {categories.length > 0 && <CategoryList categories={categories} />}
        {brands.length > 0 && <BrandList brands={brands} />}
        <div className='border-y border-slate-200 py-24 dark:border-slate-700 lg:py-32'>
          <SectionHowItWork />
        </div>
        {coupons.length > 0 && <TodayCoupons coupons={coupons} />}
        {listProductsWithLabel.map((item) =>
          item.products.length > 0 ? (
            <ProductListWithLabel key={item.label} products={item.products} label={item.label} />
          ) : null
        )}
        <div className='space-y-4'>
          <h3 className='text-2xl font-semibold'>All products</h3>
          {publishedProducts.length === 0 ? (
            <div className='flex h-20'>
              <p className='text-lg text-foreground-500'>No products found</p>
            </div>
          ) : (
            <ProductList initialProducts={publishedProducts} paginationRes={publishedProductsRes} />
          )}
        </div>
      </div>
      <div className='container'>
        <SectionPromo />
      </div>
      <SectionClientSay />
    </div>
  )
}

export default page
