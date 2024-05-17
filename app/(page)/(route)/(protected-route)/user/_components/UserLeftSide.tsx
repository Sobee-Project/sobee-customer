"use client"
import { cn } from "@/_lib/utils"
import { isNavActive } from "@/_utils"
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback } from "react"
import { userRouteMock } from "../_mock"

const UserLeftSide = () => {
  const pathname = usePathname()

  return (
    <Listbox variant='light' color='primary'>
      {userRouteMock.map(({ items, section, href }) =>
        items ? (
          <ListboxSection
            //@ts-ignore
            title={
              <span
                className={cn(
                  "text-sm font-semibold",
                  isNavActive(href, pathname) ? "text-primary" : "text-foreground"
                )}
              >
                {section}
              </span>
            }
            key={section}
          >
            {items.map(({ href, title }) => (
              <ListboxItem
                key={href}
                as={Link}
                href={href}
                className={cn(isNavActive(href, pathname) ? "text-primary" : "text-gray-400")}
              >
                {title}
              </ListboxItem>
            ))}
          </ListboxSection>
        ) : (
          <ListboxItem
            key={section}
            as={Link}
            href={href}
            classNames={{
              title: cn("font-semibold", isNavActive(href, pathname) ? "text-primary" : "text-sm"),
              base: "p-0 pl-1"
            }}
          >
            {section}
          </ListboxItem>
        )
      )}
    </Listbox>
  )
}

export default UserLeftSide
