import OrderCard from "./OrderCard"

const OrderList = () => {
  return (
    <div className='h-[80vh] min-h-[670px] w-full pr-5 md:w-1/3 md:shrink-0 lg:pr-8 '>
      <div className='flex h-full flex-col  pb-5 md:border md:border-gray-200'>
        <h3 className='p-5  text-xl font-semibold '>My Orders</h3>
        <div className='w-full overflow-auto scrollbar scrollbar-w-1' style={{ height: "calc(100% - 80px)" }}>
          <div className='px-5'>
            <OrderCard isActive={true} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
            <OrderCard isActive={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderList
