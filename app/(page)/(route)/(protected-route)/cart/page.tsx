import { fetchOrderItems } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IOrderItem } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { redirect } from "next/navigation"
import { CartList, Checkout } from "./_components"

const layout = async ({ searchParams }: any) => {
  let cart = [] as IOrderItem[]
  const cartRes = await fetchOrderItems()
  if (cartRes.success) {
    cart = cartRes.data!
  }

  return (
    <div className='mx-[5%] mt-8'>
      <h2 className='mb-12 text-3xl font-semibold'>Shopping cart</h2>
      <div className='relative gap-8 md:flex'>
        <CartList cart={cart} />
        <Divider orientation='vertical' className='h-auto min-h-80' />
        <Checkout cart={cart} />
      </div>
    </div>
  )
}

export default layout
