import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"

const OrderStatusTabs = dynamic(() => import("./_components/OrderStatusTabs"), {
  ssr: false,
  loading: () => <Spinner />
})

const layout = ({ children }: any) => {
  return (
    <div>
      <OrderStatusTabs />
      <div className='pt-2'>{children}</div>
    </div>
  )
}

export default layout
