import { fetchAllAddresses, fetchOrderItems, fetchPaymentMethods, getCurrentUser } from "@/_actions"
import { IAddress, IOrderItem, IPaymentMethod, IUser } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { CheckoutCartList, CheckoutHandler, CheckoutInfo } from "./_components"

const page = async () => {
  let addresses = [] as IAddress[]
  let user = {} as IUser
  let paymentMethods = [] as IPaymentMethod[]
  const userPromise = getCurrentUser()
  const addressesPromise = fetchAllAddresses()

  const [userRes, addressesRes] = await Promise.all([userPromise, addressesPromise])

  if (userRes.data) {
    user = userRes.data.user
  }

  if (addressesRes.success) {
    addresses = addressesRes.data!
  }

  return (
    <div className='mx-[5%] my-8'>
      <h2 className='mb-12 text-3xl font-semibold'>Checkout</h2>
      <CheckoutHandler addresses={addresses} user={user} />
    </div>
  )
}

export default page
