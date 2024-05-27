import { IOrder } from "@/_lib/interfaces"
import { cn, formatCurrency } from "@/_lib/utils"
import { format } from "date-fns"

type Props = {
  isActive: boolean
  onClick?: (e: any) => void
  order: IOrder
}

const OrderCard = ({ isActive, onClick, order }: Props) => {
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
          <span className='font-normal'>{order.orderGeneratedId}</span>
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
          <span className='ml-1'>{format(order.createdAt!, "dd/MM/yyyy HH:mm")}</span>
        </p>
        <p className=' mb-4 flex w-full items-center justify-between text-sm last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Latest update"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1 truncate'>{format(order.updatedAt!, "dd/MM/yyyy HH:mm")}</span>
        </p>
        <p className=' mb-4 flex w-full items-center justify-between text-sm font-bold last:mb-0'>
          <span className='w-24 shrink-0 overflow-hidden'>{"Total"}</span>
          <span className='mr-auto'>:</span>
          <span className='ml-1'>{formatCurrency(order.total)}</span>
        </p>
      </div>
    </div>
  )
}
export default OrderCard
