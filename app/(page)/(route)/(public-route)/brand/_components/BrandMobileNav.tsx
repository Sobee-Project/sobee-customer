"use client"
import { IBrand, ICategory, IPaginate } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { AlignRight, SlidersHorizontal } from "lucide-react"
import { BrandLeftSide } from "."

type Props = {
  brands: IBrand[]
  paginationRes: IPaginate
}

const UserTabBarMobile = ({ brands, paginationRes }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='light'>
          <SlidersHorizontal size={20} strokeWidth={1.5} />
          <p>Filter</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <BrandLeftSide brands={brands} paginationRes={paginationRes} />
      </PopoverContent>
    </Popover>
  )
}

export default UserTabBarMobile
