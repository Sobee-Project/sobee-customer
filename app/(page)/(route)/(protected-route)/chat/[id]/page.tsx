import { fetchRoomById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { Button } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import ChatList from "./_components/ChatList"
import SendMessage from "./_components/SendMessage"

const page = async ({ params }: any) => {
  const roomId = params.id

  const res = await fetchRoomById(roomId)

  if (!res.success) {
    return (
      <div className='mt-20 flex justify-center'>
        <p>{res.message}</p>
      </div>
    )
  }

  const room = res.data!

  return (
    <div className='relative flex h-full flex-col justify-end'>
      <div className='absolute inset-x-0 top-0 flex w-full justify-between border-b bg-background p-4'>
        <Link href={APP_ROUTES.CHAT.INDEX} className='px-4'>
          <ChevronLeft size={24} />
        </Link>
        <h2 className='flex-1'>{room.title}</h2>
        {/* <div className='flex items-center gap-4'>
          <button className='text-sm text-danger'>Leave room</button>
        </div> */}
      </div>
      <ChatList roomId={room._id!} />
      <SendMessage roomId={room._id!} />
    </div>
  )
}

export default page
