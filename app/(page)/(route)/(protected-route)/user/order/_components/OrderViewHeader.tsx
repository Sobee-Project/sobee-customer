import { cn } from "@/_lib/utils"
import Badge from "./Badge"

type Props = {
  wrapperClassName?: string
  buttonSize?: "big" | "medium" | "small"
  loading?: boolean
}

const OrderViewHeader = ({ buttonSize, loading, wrapperClassName }: Props) => {
  return (
    <div className={cn(`bg-gray-100 dark:bg-gray-700  ${wrapperClassName}`)}>
      <div className=' mb-0 flex flex-col flex-wrap items-center justify-between gap-x-8 text-base font-bold sm:flex-row lg:flex-nowrap'>
        <div className='xs:flex-nowrap order-2 grid w-full max-w-full basis-full grid-cols-1 justify-between gap-6 sm:order-1 md:grid-cols-2 lg:mr-auto'>
          <div className='flex items-center gap-3'>
            <span className='xs:text-base block shrink-0 grow-0 basis-auto lg:inline-block'>Order Status : </span>
            <div className='w-full lg:w-auto'>
              <Badge
                text='Order Completed'
                color='bg-[#00a17f] bg-opacity-[.15] text-[#00a17f]'
                className=' min-h-8 items-center justify-center text-sm !leading-none'
              />
            </div>
          </div>
          <div className='flex items-center gap-3 md:ml-auto'>
            <span className='xs:text-base block shrink-0 grow-0 basis-auto lg:inline-block'>{"Payment Status : "}</span>
            <div className='w-full lg:w-auto'>
              <Badge
                text={"Payment Success"}
                color={"bg-[#00a17f] bg-opacity-[.15] text-[#00a17f]"}
                className=' min-h-8 items-center justify-center truncate whitespace-nowrap text-sm !leading-none'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderViewHeader
