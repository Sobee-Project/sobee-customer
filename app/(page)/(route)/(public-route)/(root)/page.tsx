import { fetchAllBrands, fetchAllCategories, fetchTodayCoupons } from "@/_actions"
import {
  fetchBestSellerProducts,
  fetchDiscountProducts,
  fetchFeaturedProducts,
  fetchPopularProducts,
  fetchPublishedProducts
} from "@/_actions/product-action"
import { IBrand, ICategory, ICoupon, IProduct } from "@/_lib/interfaces"
import React from "react"
import { BrandList, Campaign, CategoryList, ProductListWithLabel, TodayCoupons } from "./_components"

const page = async () => {
  let publishedProducts = [] as IProduct[]
  let popularProducts = [] as IProduct[]
  let featuredProducts = [] as IProduct[]
  let bestSellerProducts = [] as IProduct[]
  let discountProducts = [] as IProduct[]
  let categories = [] as ICategory[]
  let brands = [] as IBrand[]
  let coupons = [] as ICoupon[]

  const publishedProductsPromise = fetchPublishedProducts()
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
    },
    {
      label: "All Products",
      products: publishedProducts
    }
  ]

  return (
    <div>
      <Campaign />
      <div className='mx-[5%] my-4 space-y-4 md:mx-[10%]'>
        {categories.length > 0 && <CategoryList categories={categories} />}
        {brands.length > 0 && <BrandList brands={brands} />}
        {coupons.length > 0 && <TodayCoupons coupons={coupons} />}
        {listProductsWithLabel.map((item) =>
          item.products.length > 0 ? (
            <ProductListWithLabel key={item.label} products={item.products} label={item.label} />
          ) : null
        )}
      </div>
    </div>
  )
}

export default page
