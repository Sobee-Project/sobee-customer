import { fetchOrderItems } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IOrderItem } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { redirect } from "next/navigation"
import { CartList, Checkout } from "./_components"

const layout = async ({ searchParams }: any) => {
  return (
    <div className='mx-[5%] mt-8'>
      <h2 className='mb-12 text-3xl font-semibold'>Shopping cart</h2>
      <div className='relative flex flex-col gap-8 md:flex-row'>
        <CartList />
        <Divider orientation='vertical' className='hidden h-auto min-h-80 md:block' />
        <Checkout />
      </div>
    </div>
  )
}

export default layout
