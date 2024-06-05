"use client"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

export const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    content: "Great quality products, affordable prices, fast and friendly delivery. I very recommend."
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    content: "Great quality products, affordable prices, fast and friendly delivery. I very recommend."
  },
  {
    id: 3,
    clientName: "Berta Emili",
    content: "Great quality products, affordable prices, fast and friendly delivery. I very recommend."
  }
]

const SectionClientSay = () => {
  const renderBg = () => {
    return (
      <div className='hidden md:block'>
        <Image
          sizes='100px'
          className='absolute -left-20 top-9'
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay1.png"
          }
          alt=''
        />
        <Image
          sizes='100px'
          className='absolute bottom-[100px] right-full mr-40'
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay2.png"
          }
          alt=''
        />
        <Image
          sizes='100px'
          className='absolute left-[140px] top-full'
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay3.png"
          }
          alt=''
        />
        <Image
          sizes='100px'
          className='absolute -bottom-10 right-[140px]'
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay4.png"
          }
          alt=''
        />
        <Image
          sizes='100px'
          className='absolute bottom-[80px] left-full ml-32'
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay5.png"
          }
          alt=''
        />
        <Image
          sizes='100px'
          className='absolute -right-10 top-10 '
          height={59}
          width={59}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSay6.png"
          }
          alt=''
        />
      </div>
    )
  }
  return (
    <div className='relative mt-20 flow-root'>
      {/* heading */}
      <div className='mx-auto mb-12 flex w-full flex-col items-center text-center text-neutral-900 dark:text-neutral-50 lg:mb-14'>
        <h2 className='justify-center text-3xl font-semibold md:text-4xl'>Good news from far away 🥇</h2>
        <span className='mt-2 block text-balance font-normal text-neutral-500 dark:text-neutral-400 sm:text-xl md:mt-3'>
          Let&apos;s see what people think of Ciseco
        </span>
      </div>
      {/*  */}
      <div className='relative mx-auto max-w-2xl md:mb-16'>
        {renderBg()}

        <Image
          className='mx-auto'
          width={126}
          height={100}
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717569703/sobee-storage/image/banner/clientSayMain.png"
          }
          alt=''
        />
        <div className='relative mt-12 lg:mt-16 '></div>

        <Image
          className='absolute right-full top-1/2 -mr-16 opacity-50 md:opacity-100 lg:mr-3'
          src={"https://res.cloudinary.com/dtfkou1of/image/upload/v1717571455/sobee-storage/image/banner/quotation.png"}
          width={52}
          height={45}
          alt=''
        />
        <Image
          className='absolute left-full top-1/2 -ml-16 opacity-50 md:opacity-100 lg:ml-3'
          src={
            "https://res.cloudinary.com/dtfkou1of/image/upload/v1717571455/sobee-storage/image/banner/quotation2.png"
          }
          width={52}
          height={45}
          alt=''
        />
        <div className='relative mt-12 lg:mt-16 '>
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
            pagination={{
              clickable: true
            }}
            modules={[Pagination, Autoplay]}
            className='relative size-full'
          >
            {DEMO_DATA.map((item) => (
              <SwiperSlide key={item.id}>
                <div className='flex flex-col items-center justify-center pb-20 text-center'>
                  <span className='block text-2xl'>{item.content}</span>
                  <span className='mt-8 block text-2xl font-semibold'>{item.clientName}</span>
                  <div className='mt-3.5 flex items-center space-x-0.5 text-yellow-500'>
                    <StarIcon className='size-6' />
                    <StarIcon className='size-6' />
                    <StarIcon className='size-6' />
                    <StarIcon className='size-6' />
                    <StarIcon className='size-6' />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
export default SectionClientSay
