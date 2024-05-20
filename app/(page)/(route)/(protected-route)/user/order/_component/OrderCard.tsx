import { cn } from "@/_lib/utils"

type Props = {
  isActive: boolean
  onClick?: (e: any) => void
}

const OrderCard = ({ isActive, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      role='button'
      className={cn(
        "mb-4 flex w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded border-2 border-transparent bg-gray-100 last:mb-0 dark:bg-default-200",
        isActive === true && "!border-primary"
      )}
    >
      <div className='flex items-center justify-between border-b border-gray-400 px-5 py-3 md:px-3 lg:px-5 '>
        <span className='mr-4 flex shrink-0 text-sm  font-bold lg:text-base'>
          Order
          <span className='font-normal'>#{48}</span>
        </span>
        <span
          // className="max-w-full truncate whitespace-nowrap rounded bg-blue-100 px-3 py-2 text-sm text-blue-500"
          className={`max-w-full truncate whitespace-nowrap rounded bg-[#00a17f]/15  px-3 py-2 text-sm text-[#00a17f] dark:bg-[#00a17f]/30 `}
          title={"Order Completed"}
        >
          {"Order Completed"}
        </span>
      </div>

      <div className='flex flex-col p-5 md:p-3 lg:px-4 lg:py-5'>
        <p className=' mb-4 flex w-full items-center justify-between text-sm last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Order Date"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1'>{"May 15, 2024"}</span>
        </p>
        <p className=' mb-4 flex w-full items-center justify-between text-sm last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Delivery Time"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1 truncate'>{"Express Delivery"}</span>
        </p>
        <p className=' mb-4 flex w-full items-center justify-between text-sm font-bold last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Amount"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1'>{"$280.00"}</span>
        </p>
        <p className=' mb-4 flex w-full items-center justify-between text-sm font-bold last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Total Price"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1'>{"$280.00"}</span>
        </p>
      </div>
    </div>
  )
}
export default OrderCard
