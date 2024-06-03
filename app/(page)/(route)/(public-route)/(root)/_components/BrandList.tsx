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
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-semibold'>Brands</h3>
        <Link
          href={APP_ROUTES.BRANDS.INDEX}
          className='flex items-center text-primary hover:text-primary-400 hover:transition-colors'
        >
          <p>View all brands</p>
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
