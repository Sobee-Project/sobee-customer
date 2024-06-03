"use client"
import { cn } from "@/_lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { FreeMode, Pagination } from "swiper/modules"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"

type Props = {
  assets: string[]
}

const ProductAssets = ({ assets }: Props) => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0)
  const swiperRef = useRef<SwiperRef | null>(null)
  return (
    <div>
      <div className='relative'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination, FreeMode]}
          onSlideChange={(swiper) => setSelectedAssetIndex(swiper.activeIndex)}
          ref={swiperRef}
        >
          {assets.map((asset) => (
            <SwiperSlide key={asset} className='grid w-full place-items-center'>
              <Image src={asset} alt='Product image' width={400} height={400} className='w-full rounded bg-white' />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={cn(
            "absolute left-1 top-1/2 z-[4] cursor-pointer rounded-full border bg-white p-2 shadow-xl transition-colors hover:bg-slate-200",
            selectedAssetIndex === 0 && "hidden"
          )}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <ChevronLeft stroke='black' size={20} />
        </div>
        <div
          className={cn(
            "absolute right-1 top-1/2 z-[4] cursor-pointer rounded-full border bg-white p-2 shadow-xl transition-colors hover:bg-slate-200",
            selectedAssetIndex === assets.length - 1 && "hidden"
          )}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <ChevronRight stroke='black' size={20} />
        </div>
      </div>
      {assets.length > 1 && (
        <div className='mt-4 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4'>
          {assets.map((asset, index) => (
            <div
              key={asset}
              onClick={() => {
                setSelectedAssetIndex(index)
                swiperRef.current?.swiper.slideTo(index)
              }}
              className={cn(
                "grid place-items-center overflow-hidden rounded-lg border-2 opacity-50 transition-all",
                selectedAssetIndex === index && "border-primary opacity-100"
              )}
            >
              <Image
                src={asset}
                alt='Product image'
                width={100}
                height={100}
                className='pointer-events-none w-full select-none bg-white object-contain'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductAssets
