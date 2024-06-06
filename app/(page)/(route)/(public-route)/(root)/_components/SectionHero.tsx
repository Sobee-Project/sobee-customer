"use client"

import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Autoplay, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { API_ROUTES } from "@/_constants"
import { Search } from "lucide-react"
import Link from "next/link"
import React from "react"
import "swiper/css"
import "swiper/css/scrollbar"

type Props = {}

const Background =
  "https://res.cloudinary.com/dtfkou1of/image/upload/v1717511180/sobee-storage/image/banner/Moon_j4km8r.svg"
const BannerList = [
  {
    image:
      "https://res.cloudinary.com/dtfkou1of/image/upload/v1717512030/sobee-storage/image/banner/hero-right-1_t0dn7l.png",
    heading: "Exclusive collection for everyone",
    subHeading: "In this season, find the best 🔥",
    btnText: "Explore now",
    btnLink: API_ROUTES.PRODUCT.GET_ALL_PRODUCTS
  },
  {
    image:
      "https://res.cloudinary.com/dtfkou1of/image/upload/v1717512025/sobee-storage/image/banner/hero-right-2_devik7.png",
    heading: "Exclusive collection for everyone",
    subHeading: "In this season, find the best 🔥",
    btnText: "Explore now",
    btnLink: API_ROUTES.PRODUCT.GET_ALL_PRODUCTS
  },
  {
    image:
      "https://res.cloudinary.com/dtfkou1of/image/upload/v1717512025/sobee-storage/image/banner/hero-right-3_ktrbcf.png",
    heading: "Exclusive collection for everyone",
    subHeading: "In this season, find the best 🔥",
    btnText: "Explore now",
    btnLink: API_ROUTES.PRODUCT.GET_ALL_PRODUCTS
  }
]

const SectionHero = ({}: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  return (
    <div className='w-full xl:h-[calc(100vh-96px)]'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        grid={{
          rows: 1
        }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true
        }}
        loop
        scrollbar={{
          draggable: true,
          hide: true
        }}
        onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
        modules={[Scrollbar, Autoplay]}
        className='relative size-full'
      >
        {BannerList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='h-full'>
              <div className='absolute inset-0 bg-[#E3FFE6] dark:bg-[#93c298]'>
                <Image
                  fill
                  sizes='(max-width: 768px) 100vw, 50vw'
                  className='absolute size-full object-contain'
                  src={Background}
                  alt='hero'
                />
              </div>
              <div className='container relative pb-0 pt-14 sm:pt-20 lg:py-44 xl:h-full'>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlideIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: currentSlideIndex === index ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='space-y-5 sm:space-y-6'
                  >
                    <span className='block text-base font-medium text-slate-700 md:text-xl'>{item.subHeading}</span>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: currentSlideIndex === index ? 1 : 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className=' text-3xl font-semibold !leading-[114%] text-slate-900 sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl'
                    >
                      {item.heading}
                    </motion.h2>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: currentSlideIndex === index ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      as={Link}
                      size='lg'
                      variant='solid'
                      color='primary'
                      endContent={<Search />}
                      href={item.btnLink}
                      radius='full'
                    >
                      {item.btnText}
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: currentSlideIndex === index ? 1 : 0, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className='inset-y-0 end-0 w-full max-w-2xl pt-10 lg:absolute lg:mt-0 xl:max-w-3xl 2xl:max-w-4xl '
                >
                  <Image
                    fill
                    sizes='(max-width: 768px) 100vw, 50vw'
                    className='size-full object-contain object-right-bottom'
                    src={item.image}
                    alt={item.heading}
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* button prev and next */}
    </div>
  )
}
export default SectionHero
