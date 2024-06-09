"use client"
import { ScreenLoader } from "@/_components"
import { useChatRoomSocket } from "@/_hooks"
import { cn } from "@/_lib/utils"
import { Spinner } from "@nextui-org/react"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import RoomItem from "./RoomItem"

const ChatRooms = () => {
  const { id } = useParams()
  console.log(id)
  const { data, error, isLoading, isError } = useChatRoomSocket()
  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [error, isError])

  return (
    <div className={cn("hidden space-y-2 p-4", id ? "md:block" : "block")}>
      {isLoading ? (
        <Spinner />
      ) : data.length > 0 ? (
        data.map((room) => <RoomItem key={room._id} room={room} />)
      ) : (
        <div>No chat rooms found</div>
      )}
    </div>
  )
}

export default ChatRooms
