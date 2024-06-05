import React, { FC } from "react"

import { Chip } from "@nextui-org/react"
import Image from "next/image"

export interface SectionHowItWorkProps {
  className?: string
  data?: (typeof DEMO_DATA)[0][]
}

const DEMO_DATA = [
  {
    id: 1,
    img: "https://res.cloudinary.com/dtfkou1of/image/upload/v1717518395/sobee-storage/image/banner/HIW1img_mtfhot.png",
    title: "Filter & Discover",
    desc: "Smart filtering and suggestions make it easy to find"
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dtfkou1of/image/upload/v1717518396/sobee-storage/image/banner/HIW2img_bbp9de.png",
    title: "Add to bag",
    desc: "Easily select the correct items and add them to the cart"
  },
  {
    id: 3,
    img: "https://res.cloudinary.com/dtfkou1of/image/upload/v1717518395/sobee-storage/image/banner/HIW3img_yhfeod.png",
    title: "Fast shipping",
    desc: "The carrier will confirm and ship quickly to you"
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dtfkou1of/image/upload/v1717518395/sobee-storage/image/banner/HIW4img_f5aepq.png",
    title: "Enjoy the product",
    desc: "Have fun and enjoy your 5-star quality products"
  }
]

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className = "", data = DEMO_DATA }) => {
  return (
    <div className={`${className}`}>
      <div className='relative grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4 xl:gap-20'>
        <div className='absolute inset-x-0 hidden h-1/2 w-full md:block'>
          <Image
            className=' w-full '
            src={
              "https://res.cloudinary.com/dtfkou1of/image/upload/v1717518729/sobee-storage/image/banner/VectorHIW_dau5f6.svg"
            }
            fill
            priority
            alt='vector'
          />
        </div>
        {data.map((item: (typeof DEMO_DATA)[number], index: number) => (
          <div key={item.id} className='relative mx-auto flex max-w-xs flex-col items-center'>
            <div className='mx-auto mb-4 max-w-[140px] sm:mb-10'>
              <Image className='rounded-3xl' src={item.img} sizes='150px' width={150} height={150} alt='HIW' />
            </div>
            <div className='mt-auto space-y-5 text-center'>
              <Chip
                classNames={{
                  base: getColorClass(
                    false,
                    index === 0 ? "red" : index === 1 ? "indigo" : index === 2 ? "yellow" : "purple"
                  ),
                  content: getColorClass(
                    false,
                    index === 0 ? "red" : index === 1 ? "indigo" : index === 2 ? "yellow" : "purple"
                  )
                }}
              >
                {`Step ${index + 1}`}
              </Chip>
              <h3 className='text-base font-semibold'>{item.title}</h3>
              <span className='block text-sm leading-6 text-slate-600 dark:text-slate-400'>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionHowItWork

const getColorClass = (hasHover = true, color: string) => {
  switch (color) {
    case "pink":
      return `text-pink-800 bg-pink-100 ${hasHover ? "hover:bg-pink-800" : ""}`
    case "red":
      return `text-red-800 bg-red-100 ${hasHover ? "hover:bg-red-800" : ""}`
    case "gray":
      return `text-gray-800 bg-gray-100 ${hasHover ? "hover:bg-gray-800" : ""}`
    case "green":
      return `text-green-800 bg-green-100 ${hasHover ? "hover:bg-green-800" : ""}`
    case "purple":
      return `text-purple-800 bg-purple-100 ${hasHover ? "hover:bg-purple-800" : ""}`
    case "indigo":
      return `text-indigo-800 bg-indigo-100 ${hasHover ? "hover:bg-indigo-800" : ""}`
    case "yellow":
      return `text-yellow-800 bg-yellow-100 ${hasHover ? "hover:bg-yellow-800" : ""}`
    case "blue":
      return `text-blue-800 bg-blue-100 ${hasHover ? "hover:bg-blue-800" : ""}`
    default:
      return `text-pink-800 bg-pink-100 ${hasHover ? "hover:bg-pink-800" : ""}`
  }
}
