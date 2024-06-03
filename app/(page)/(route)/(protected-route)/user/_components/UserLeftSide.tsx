"use client"
import { cn } from "@/_lib/utils"
import { isNavActive } from "@/_utils"
import { Accordion, AccordionItem } from "@nextui-org/react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { userRouteMock } from "../_mock"

const UserLeftSide = () => {
  const pathname = usePathname()
  const [selectedKey, setSelectedKey] = useState<string>(pathname)

  const getParentKeyFromPathname = useCallback(() => {
    const parentKey = userRouteMock.find(({ items }) => items?.some(({ href }) => href === pathname))
    return parentKey?.href
  }, [pathname])

  useEffect(() => {
    setSelectedKey(getParentKeyFromPathname() || pathname)
  }, [getParentKeyFromPathname, pathname])

  return (
    <Accordion showDivider={false} isCompact selectedKeys={[selectedKey]}>
      {userRouteMock.map(({ href, items, section, icon: Icon }) => (
        <AccordionItem
          key={href}
          title={<Link href={href}>{section}</Link>}
          onPress={() => setSelectedKey(href)}
          classNames={{
            title: cn("font-medium", isNavActive(href, pathname) ? "text-primary" : "text-foreground")
          }}
          startContent={
            <Icon size={20} className={cn(isNavActive(href, pathname) ? "text-primary" : "text-foreground")} />
          }
        >
          <div className='flex flex-col gap-2 pl-2'>
            {items &&
              items.map(({ href: childHref, title }) => (
                <Link
                  key={childHref}
                  href={childHref}
                  className={cn(
                    "transition-colors hover:text-primary",
                    isNavActive(childHref, pathname) ? "text-primary" : "text-foreground"
                  )}
                >
                  {title}
                </Link>
              ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default UserLeftSide
