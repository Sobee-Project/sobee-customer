import { Eye, Frown } from "lucide-react"
import OrderViewHeader from "./OrderViewHeader"

const OrderDetails = () => {
  return (
    <div className='flex w-full flex-col border border-gray-200  lg:w-2/3'>
      <div className='flex flex-col items-center p-5 md:flex-row md:justify-between'>
        <h2 className='mb-2 flex text-sm font-semibold md:text-lg'>
          {"Order Details"} <span className='px-2'>-</span> {20231025982186}
        </h2>
        <div className='flex items-center gap-2'>
          <div className=' mr-4 flex items-center text-sm font-semibold text-gray-400 transition-colors hover:text-primary-700 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400'>
            <Frown size={16} className='mr-1' />
            {"Ask for a refund"}
          </div>
          <div className='flex items-center text-sm font-semibold text-primary-700 no-underline transition duration-200 hover:text-primary-600 focus:text-primary-600'>
            <Eye size={16} className='mr-1' />
            {"See Details"}
          </div>
        </div>
      </div>
      <div className='relative mx-5 mb-6 overflow-hidden rounded'>
        <OrderViewHeader wrapperClassName='px-7 py-4' buttonSize='small' loading={false} />
      </div>
      <div className='flex flex-col border-b border-gray-200 sm:flex-row'>
        <div className='flex w-full flex-col border-b border-gray-200 px-5 py-4 sm:border-b-0 sm:border-r md:w-3/5 '>
          <div className='mb-4'>
            <span className=' mb-2 block  font-bold'>{"Shipping Address"}</span>

            <span>{"2148 Straford Park, KY, Winchester, 40391, United States"}</span>
          </div>

          <div>
            <span className=' mb-2 block  font-bold'>{"Billing Address"}</span>

            <span>{"2231 Kidd Avenue, AK, Kipnuk, 99614, United States"}</span>
          </div>
        </div>

        <div className='flex w-full flex-col px-5 py-4 md:w-2/5'>
          <div className='mb-3 flex justify-between'>
            <span className='text-gray-500 dark:text-gray-200'>{"Sub Total"}</span>
            <span>{"$130.00"}</span>
          </div>

          <div className='mb-3 flex justify-between'>
            <span className='text-gray-500 dark:text-gray-200'>{"Discount"}</span>
            <span>{"$0.00"}</span>
          </div>

          <div className='mb-3 flex justify-between'>
            <span className='text-gray-500 dark:text-gray-200'>{"Delivery Fee"}</span>
            <span>{"$50.00"}</span>
          </div>
          <div className='mb-3 flex justify-between'>
            <span className='text-gray-500 dark:text-gray-200'>{"Tax"}</span>
            <span>{"$2.60"}</span>
          </div>

          <div className='flex justify-between'>
            <span className='font-bold '>{"Total"}</span>
            <span className='  font-bold'>{"$182.60"}</span>
          </div>
        </div>
      </div>
      {/* Order Table */}
      <div>
        <div className='flex w-full items-center justify-center px-6'>{/* progress bảr */}</div>
      </div>
    </div>
  )
}
export default OrderDetails
