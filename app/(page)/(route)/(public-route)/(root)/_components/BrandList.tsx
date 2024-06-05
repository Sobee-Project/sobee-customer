"use client"
import { BrandCard } from "@/(page)/(route)/_components"
import { APP_ROUTES } from "@/_constants"
import { IBrand } from "@/_lib/interfaces"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type Props = {
  brands: IBrand[]
}

const BrandList = ({ brands }: Props) => {
  return (
    <div className=' space-y-10 pt-20'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-semibold md:text-4xl'>
          Choose your favorite brands
          <span className=''>{`. `}</span>
          <span className='text-neutral-500 dark:text-neutral-400'>What&apos;s trending now</span>
        </h2>
        <Link
          href={APP_ROUTES.BRANDS.INDEX}
          className='flex items-center text-primary hover:text-primary-400 hover:transition-colors'
        >
          <p>View all</p>
          <ChevronRight size={20} />
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
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
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <BrandCard brand={brand} key={brand._id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BrandList
