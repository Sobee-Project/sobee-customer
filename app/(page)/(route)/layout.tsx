import { fetchOrderItems, getCurrentUser } from "@/_actions"
import { IOrderItem } from "@/_lib/interfaces"
import { PropsWithChildren } from "react"
import { Footer, Topbar } from "./_components"

// export const dynamic = "force-dynamic" // use this line to resolve Action error: Dynamic server usage: Route /product couldn't be rendered statically because it used cookies. See more info here: https://nextjs.org/docs/messages/dynamic-server-error

const layout = async ({ children }: PropsWithChildren) => {
  const res = await getCurrentUser()
  const user = res.data?.user

  let cart = [] as IOrderItem[]
  if (user) {
    const cartRes = await fetchOrderItems()
    if (cartRes.success) {
      cart = cartRes.data!
    }
  }

  return (
    <div className='min-h-screen'>
      <Topbar user={user} cart={cart} />
      <div className='min-h-[80vh]'>{children}</div>
      <Footer />
    </div>
  )
}

export default layout
