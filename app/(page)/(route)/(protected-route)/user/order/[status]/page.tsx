import React from "react"
import OrderDetails from "../_components/OrderDetails"
import OrderList from "../_components/OrderList"

const page = () => {
  return (
    <div className='hidden w-full overflow-hidden lg:flex'>
      <OrderList />
      <OrderDetails />
    </div>
  )
}

export default page
