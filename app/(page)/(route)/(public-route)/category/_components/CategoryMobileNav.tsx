"use client"
import { ICategory } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { AlignRight, SlidersHorizontal } from "lucide-react"
import CategoryLeftSide from "./CategoryLeftSide"

type Props = {
  categories: ICategory[]
}

const UserTabBarMobile = ({ categories }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='light'>
          <SlidersHorizontal size={20} strokeWidth={1.5} />
          <p>Filter</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <CategoryLeftSide categories={categories} />
      </PopoverContent>
    </Popover>
  )
}

export default UserTabBarMobile
