import {
  fetchProductById,
  fetchProductQuestions,
  fetchProductReviews,
  fetchRecommendProducts,
  fetchRelatedProducts
} from "@/_actions"
import { COOKIES_KEY } from "@/_constants"
import { EProductType } from "@/_lib/enums"
import { IProduct, IQuestion, IReview } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  ProductAssets,
  ProductDetails,
  ProductQuestions,
  ProductReviews,
  RecommendProducts,
  RelatedProducts
} from "./_components"

const page = async ({ params }: any) => {
  const cookiesData = cookies()
  const userId = cookiesData.get(COOKIES_KEY.USER_ID_KEY)
  const productRes = await fetchProductById(params.id)
  if (!productRes.success) {
    redirect("/" + productRes.statusCode)
  }
  const product = productRes.data!

  let reviews = [] as IReview[]
  let questions = [] as IQuestion[]
  let relatedProducts = [] as IProduct[]
  let recommendedProducts = [] as IProduct[]
  const reviewPromise = fetchProductReviews(params.id)
  const questionPromise = fetchProductQuestions(params.id)
  const relatedProductsPromise = fetchRelatedProducts(params.id)
  const recommendedProductsPromise = fetchRecommendProducts(params.id)

  const [reviewsRes, questionRes, relatedProductRes, recommendedProductRes] = await Promise.all([
    reviewPromise,
    questionPromise,
    relatedProductsPromise,
    recommendedProductsPromise
  ])

  if (reviewsRes.success) {
    reviews = reviewsRes.data!
  }
  if (questionRes.success) {
    questions = questionRes.data!
  }

  if (relatedProductRes.success) {
    relatedProducts = relatedProductRes.data!
  }

  if (recommendedProductRes.success) {
    recommendedProducts = recommendedProductRes.data!
  }

  const assets =
    product.type === EProductType.SIMPLE
      ? [product.thumbnail]
      : [
          ...new Set(
            product
              .variants!.map((v) => v.assets || [])
              .flat()
              .concat(product.thumbnail)
          )
        ]

  return (
    <div>
      <div className='grid-cols-2 gap-8 md:grid'>
        <ProductAssets assets={assets} />
        <ProductDetails product={product} />
      </div>
      <Divider />
      <ProductReviews reviews={reviews} />
      <Divider />
      <ProductQuestions questions={questions} />
      <Divider />
      <RelatedProducts products={relatedProducts} />
      <Divider />
      <RecommendProducts products={recommendedProducts} />
    </div>
  )
}

export default page
