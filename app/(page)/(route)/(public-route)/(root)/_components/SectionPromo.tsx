import { Button, Chip, Input } from "@nextui-org/react"
import { MoveRight } from "lucide-react"
import Image from "next/image"

const SectionPromo = () => {
  return (
    <div className='lg:pt-10'>
      <div className='relative flex flex-col rounded-2xl bg-slate-50 p-4 pb-0 dark:bg-slate-800 sm:rounded-[40px] sm:p-5 sm:pb-0 lg:flex-row lg:p-24'>
        <div className='absolute inset-0'>
          <Image
            fill
            className='absolute size-full object-contain object-bottom dark:opacity-5'
            src={
              "https://res.cloudinary.com/dtfkou1of/image/upload/v1717576474/sobee-storage/image/banner/BackgroundLine.svg"
            }
            alt='backgroundLineSvg'
          />
        </div>
        <div className='relative max-w-lg lg:w-1/2'>
          <h2 className='text-4xl font-semibold md:text-5xl'>{`Don't miss out on special offers`}</h2>
          <span className='mt-5 block text-neutral-500 dark:text-neutral-400'>
            Register to receive news about the latest, savings combos, discount codes...
          </span>
          <ul className='mt-10 space-y-4'>
            <li className='flex items-center space-x-4'>
              <Chip
                classNames={{
                  base: "bg-purple-100 text-purple-800",
                  content: "bg-purple-100 text-purple-800"
                }}
                className='min-w-10'
              >
                01
              </Chip>
              <span className='font-medium text-neutral-700 dark:text-neutral-300'>Savings combos</span>
            </li>
            <li className='flex items-center space-x-4'>
              <Chip
                classNames={{
                  base: "bg-pink-100 text-pink-800",
                  content: "bg-pink-100 text-pink-800"
                }}
                className='min-w-10'
              >
                02
              </Chip>
              <span className='font-medium text-neutral-700 dark:text-neutral-300'>Freeship</span>
            </li>
            <li className='flex items-center space-x-4'>
              <Chip
                classNames={{
                  base: "bg-red-100 text-red-800",
                  content: "bg-red-100 text-red-800"
                }}
                className='min-w-10'
              >
                03
              </Chip>
              <span className='font-medium text-neutral-700 dark:text-neutral-300'>Premium magazines</span>
            </li>
          </ul>
          <form className='relative mt-10 max-w-sm'>
            <Input
              placeholder='Enter your email'
              type='email'
              size='lg'
              endContent={
                <Button isIconOnly radius='full' className='bg-slate-900 hover:bg-slate-800' variant='bordered'>
                  <MoveRight className='text-white' size={20} />
                </Button>
              }
            />
          </form>
        </div>
        <div className='relative mt-10 block max-w-lg lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:max-w-[calc(50%-40px)]'>
          <Image
            alt='promo'
            src={"https://res.cloudinary.com/dtfkou1of/image/upload/v1717576620/sobee-storage/image/banner/promo3.png"}
            sizes='(max-width: 768px) 100vw, 50vw'
            className='size-full object-cover'
            width={751}
            height={824}
          />
        </div>
      </div>
    </div>
  )
}
export default SectionPromo
