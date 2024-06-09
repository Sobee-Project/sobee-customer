import React from "react"
import ChatRooms from "./_components/ChatRooms"

const layout = ({ children, params }: any) => {
  console.log(params)
  return (
    <div className='flex h-screen max-h-[calc(100vh-80px)] flex-col md:flex-row'>
      <div className='max-h-full w-full space-y-2 overflow-auto md:max-w-80 md:border-r'>
        <ChatRooms />
      </div>
      <div className='hidden max-h-full flex-1 overflow-auto md:block'>{children}</div>
      <div className='block max-h-full flex-1 overflow-auto md:hidden'>{children}</div>
    </div>
  )
}

export default layout
