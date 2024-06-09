"use client"
import { fetchAllOrders, fetchOrderById } from "@/_actions"
import { IOrder, IPaginate, IProduct } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { colorizeOrderStatus } from "@/_utils"
import { Accordion, AccordionItem, Button, Spinner } from "@nextui-org/react"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import OrderCard from "./OrderCard"

type Props = {
  status?: string
  initialOrders: IOrder[]
  initialPagination: IPaginate
}

const OrderList = ({ initialOrders, initialPagination, status = "ALL" }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>(initialOrders)
  const [paginationRes, setPaginationRes] = useState<IPaginate>(initialPagination)

  useEffect(() => {
    setOrders(initialOrders)
    setPaginationRes(initialPagination)
  }, [initialOrders, initialPagination])

  console.log({ paginationRes })

  const [isFetching, setIsFetching] = useState(false)

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [orderDetail, setOrderDetail] = useState<IOrder | null>(null)
  const [isOrderDetailLoading, setIsOrderDetailLoading] = useState(false)

  const fetchMore = useCallback(async () => {
    if (isFetching) return
    setIsFetching(true)
    const res = await fetchAllOrders({
      page: paginationRes.nextPage,
      status: status === "ALL" ? undefined : status
    })
    if (res.success) {
      setOrders((prev) => [...prev, ...res.data!])
      setPaginationRes(res)
    }
    setIsFetching(false)
  }, [isFetching, paginationRes.nextPage, status])

  // useEffect(() => {
  //   if (isFetching) return
  //   ;(async function () {
  //     setIsFetching(true)
  //     const res = await fetchAllOrders({
  //       status: status === "ALL" ? undefined : status
  //     })
  //     if (res.success) {
  //       setOrders(res.data!)
  //       setPaginationRes(res)
  //     } else {
  //       toast.error(res.message)
  //     }
  //     setIsFetching(false)
  //   })()
  // }, [])

  useEffect(() => {
    if (!selectedOrder) {
      setOrderDetail(null)
    }
    ;(async function () {
      if (selectedOrder) {
        setIsOrderDetailLoading(true)
        const order = await fetchOrderById(selectedOrder)
        if (order.success) {
          setOrderDetail(order.data!)
        } else {
          toast.error(order.message)
          setSelectedOrder(null)
        }
        setIsOrderDetailLoading(false)
      }
    })()
  }, [selectedOrder])

  return (
    <div className='flex-1'>
      <div className='space-y-4'>
        {orders.length === 0 ? (
          <div className='flex h-20'>
            <p className='text-lg text-foreground-500'>No orders found</p>
          </div>
        ) : (
          <Accordion className='space-y-2' selectionMode='single' selectedKeys={selectedOrder ? [selectedOrder] : []}>
            {orders.map((order) => (
              <AccordionItem
                key={order._id}
                onPress={() => {
                  if (selectedOrder === order._id) {
                    setSelectedOrder(null)
                  } else {
                    setSelectedOrder(order._id!)
                  }
                }}
                title={
                  <div className={cn("rounded p-2", colorizeOrderStatus(order.status))}>
                    <h1 className='text-lg font-semibold'>
                      {order.orderGeneratedId}- {format(order.createdAt!, "EEEE do MMMM, yyyy 'at' hh:mm aaa")}
                    </h1>
                    <p className={""}>{order.status}</p>
                  </div>
                }
              >
                {isOrderDetailLoading ? (
                  <Spinner />
                ) : orderDetail ? (
                  <OrderCard order={orderDetail} />
                ) : (
                  <p className='text-foreground-500'>Order details not found</p>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {isFetching && (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      )}

      {paginationRes.hasNext && (
        <div className='flex justify-center'>
          <Button onClick={fetchMore} className='mt-4 self-center' isLoading={isFetching} disabled={isFetching}>
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default OrderList
