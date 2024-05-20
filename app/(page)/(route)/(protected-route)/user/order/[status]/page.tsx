import React from "react"
import OrderDetails from "../_component/OrderDetails"
import OrderList from "../_component/OrderList"

const page = () => {
  return (
    <div className='hidden w-full overflow-hidden lg:flex'>
      <OrderList />
      <OrderDetails />
    </div>
  )
}

export default page
