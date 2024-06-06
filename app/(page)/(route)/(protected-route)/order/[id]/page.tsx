import { OrderItemList, StatusTracking } from "@/(page)/(route)/_components/Order"
import { fetchOrderById } from "@/_actions"
import { ParamsProps } from "@/_lib/params"
import { Divider, Spinner } from "@nextui-org/react"

const page = async ({ params }: ParamsProps) => {
  const orderRes = await fetchOrderById(params.id)
  const order = orderRes.data!
  return (
    <div className='mx-[5%] my-4'>
      <StatusTracking status={order.status} />
      <div className='mt-20'>
        <Divider className='mb-10' />
        <OrderItemList order={order} />
      </div>
    </div>
  )
}

export default page
