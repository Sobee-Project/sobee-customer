"use client"
import { CategoryCard } from "@/(page)/(route)/_components"
import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type Props = {
  categories: ICategory[]
}

const CategoryList = ({ categories }: Props) => {
  return (
    <div className='mt-20 space-y-10'>
      <div className='flex items-center justify-between gap-2'>
        <h2 className='flex-1 text-3xl font-semibold md:text-4xl'>
          Discover more categories
          <span className=''>{`. `}</span>
          <span className='text-neutral-500 dark:text-neutral-400'>Good things are waiting for you</span>
        </h2>
        <Link
          href={APP_ROUTES.CATEGORIES.INDEX}
          className='flex items-center text-primary hover:text-primary-400 hover:transition-colors'
        >
          <p className='flex-1'>View all</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        grid={{
          rows: 1
        }}
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
        style={{
          padding: "1rem 1.5rem"
        }}
        breakpoints={{
          300: {
            slidesPerView: 1
          },
          400: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1100: {
            slidesPerView: 5
          },
          1400: {
            slidesPerView: 6
          },
          1600: {
            slidesPerView: 7
          }
        }}
      >
        {/* <div className='grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'> */}
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <CategoryCard category={category} key={category._id} />
          </SwiperSlide>
        ))}
        {/* </div> */}
      </Swiper>
    </div>
  )
}

export default CategoryList
