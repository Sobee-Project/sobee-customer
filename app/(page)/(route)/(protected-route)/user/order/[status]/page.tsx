import { OrderList } from "@/(page)/(route)/_components/Order"
import { fetchAllOrders } from "@/_actions"

const page = async ({ params }: any) => {
  const status = params.status
  console.log({ status })
  const orderRes = await fetchAllOrders({ status: status === "ALL" ? undefined : status })

  return (
    <div>
      <OrderList initialOrders={orderRes?.data || []} initialPagination={orderRes} status={status} />
    </div>
  )
}

export default page
