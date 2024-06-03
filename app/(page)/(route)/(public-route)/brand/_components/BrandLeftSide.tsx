"use client"
import { fetchAllBrands } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IBrand, ICategory, IPaginate } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { countableText } from "@/_utils"
import { Accordion, AccordionItem, Button } from "@nextui-org/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type Props = {
  brands: IBrand[]
  paginationRes: IPaginate
}

const CategoryLeftSide = ({ brands, paginationRes: pagination }: Props) => {
  const [brandsState, setBrandsState] = useState<IBrand[]>(brands)
  const [paginationRes, setPaginationRes] = useState<IPaginate>(pagination)
  const [isFetching, setIsFetching] = useState(false)
  const pathname = usePathname()
  const keyFromPathname = pathname.split("/").pop()

  const isNavActive = (id: string) => {
    return keyFromPathname === id
  }

  useEffect(() => {
    setBrandsState(brands)
    setPaginationRes(pagination)
  }, [brands, pagination])

  const fetchMore = useCallback(async () => {
    if (!isFetching) {
      setIsFetching(true)
      const res = await fetchAllBrands({
        page: paginationRes.nextPage
      })
      if (res.success) {
        setBrandsState((prev) => [...prev, ...res.data!])
        setPaginationRes(res)
      }
      setIsFetching(false)
    }
  }, [paginationRes.nextPage, isFetching])

  return (
    <div className='space-y-2'>
      {brandsState.map(({ name, _id, productCount, logo }) => (
        <Link
          key={_id}
          href={APP_ROUTES.BRANDS.ID.replace(":id", _id!)}
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            isNavActive(_id!) ? "text-primary" : "text-foreground"
          )}
        >
          <Image
            src={logo || ""}
            alt={name}
            width={80}
            height={80}
            className='size-10 rounded-full border object-cover'
          />
          <p className='line-clamp-1 flex-1'>{name}</p>
          <span className='text-xs text-foreground'>
            {productCount} {countableText(productCount, "product", "products")}
          </span>
        </Link>
      ))}
      {paginationRes.hasNext && (
        <div className='flex justify-center'>
          <Button
            onClick={fetchMore}
            className='mt-4 self-center'
            size='sm'
            isLoading={isFetching}
            disabled={isFetching}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryLeftSide
