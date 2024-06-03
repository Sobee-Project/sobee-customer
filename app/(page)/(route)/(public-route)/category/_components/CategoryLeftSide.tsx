"use client"
import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { countableText } from "@/_utils"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type Props = {
  categories: ICategory[]
}

const CategoryLeftSide = ({ categories }: Props) => {
  const pathname = usePathname()
  const keyFromPathname = pathname.split("/").pop()

  const [selectedKey, setSelectedKey] = useState<string>(keyFromPathname || "")
  const parentCategories = categories.filter(({ parent }) => !parent)

  const getParentKeyFromPathname = useCallback(() => {
    const parentKey = parentCategories.find(({ children, slug }) =>
      (children as ICategory[]).some(
        ({ slug: childSlug, parent }) => slug === keyFromPathname || childSlug === keyFromPathname
      )
    )
    return parentKey?.slug
  }, [keyFromPathname, parentCategories])

  const isNavActive = (id: string) => {
    const key = getParentKeyFromPathname()
    return keyFromPathname === id || key === id
  }

  useEffect(() => {
    const key = getParentKeyFromPathname()
    setSelectedKey(key || keyFromPathname || "")
  }, [getParentKeyFromPathname, keyFromPathname])

  return (
    <Accordion showDivider={false} isCompact selectedKeys={[selectedKey]}>
      {parentCategories.map(({ children: _children, name, slug, image, _id }) => (
        <AccordionItem
          key={slug}
          title={
            <h2 className='block w-full text-left' onClick={() => setSelectedKey(slug)}>
              {name}
            </h2>
          }
          onPress={() => setSelectedKey(slug)}
          indicator={() => <ChevronLeft size={16} strokeWidth={1.5} onClick={() => setSelectedKey(slug)} />}
          classNames={{
            title: cn("font-medium", isNavActive(slug) ? "text-primary" : "text-foreground")
          }}
          textValue={slug}
          startContent={
            <Image
              src={image || ""}
              alt={name}
              width={80}
              height={80}
              className='size-10 rounded-full border object-cover'
              onClick={() => setSelectedKey(slug)}
            />
          }
        >
          <div className='flex flex-col gap-2 pl-2'>
            {_children &&
              (_children as ICategory[]).map(
                ({
                  name: childName,
                  slug: childSlug,
                  _id: childId,
                  productCount: childProductCount,
                  image: childImage
                }) => (
                  <Link
                    key={childId}
                    href={APP_ROUTES.CATEGORIES.ID.replace(":id", childSlug)}
                    className={cn(
                      "flex items-center gap-2 transition-colors hover:text-primary",
                      isNavActive(childSlug) ? "text-primary" : "text-foreground"
                    )}
                  >
                    <Image
                      src={childImage || ""}
                      alt={childName}
                      width={80}
                      height={80}
                      className='size-10 rounded-full border object-cover'
                    />
                    <p className='line-clamp-1 flex-1'>{childName}</p>
                    <span className='text-xs text-foreground'>
                      {childProductCount} {countableText(childProductCount, "product", "products")}
                    </span>
                  </Link>
                )
              )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default CategoryLeftSide
