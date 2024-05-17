"use client"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { AlignRight } from "lucide-react"
import UserLeftSide from "./UserLeftSide"

const UserTabBarMobile = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='light'>
          <AlignRight />
          <p>Menu</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <UserLeftSide />
      </PopoverContent>
    </Popover>
  )
}

export default UserTabBarMobile
