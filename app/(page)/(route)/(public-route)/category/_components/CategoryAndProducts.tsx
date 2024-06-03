"use client"
import { ProductCard } from "@/(page)/(route)/_components"
import { APP_ROUTES } from "@/_constants"
import { ICategory, IProduct } from "@/_lib/interfaces"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type Props = {
  products: IProduct[]
} & ICategory

const CategoryAndProducts = ({ name, slug, products }: Props) => {
  if (products.length === 0) return null
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>{name}</h3>
        <Link
          href={APP_ROUTES.CATEGORIES.ID.replace(":id", slug)}
          className='flex items-center text-primary hover:text-primary-400 hover:transition-colors'
        >
          <p>View all products</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      {products.length > 0 ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          grid={{
            rows: 1
          }}
          className='px-1 py-4'
          freeMode
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true
          }}
          loop
          modules={[Pagination, FreeMode, Autoplay]}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            300: {
              slidesPerView: 1
            },
            400: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 1
            },
            1100: {
              slidesPerView: 2
            },
            1200: {
              slidesPerView: 3
            },
            1500: {
              slidesPerView: 4
            },
            1700: {
              slidesPerView: 5
            },
            2000: {
              slidesPerView: 6
            }
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} key={product._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className='text-foreground-500'>No products found</p>
      )}
    </div>
  )
}

export default CategoryAndProducts
