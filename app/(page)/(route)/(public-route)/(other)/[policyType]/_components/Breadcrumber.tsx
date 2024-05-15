"use client"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import React from "react"
import titleize from "titleize"

type Props = {
  routes: {
    href: string
    title: string
  }[]
}

const Breadcrumber = ({ routes }: Props) => {
  return (
    <Breadcrumbs size='lg'>
      {routes.map(({ href, title }) => (
        <BreadcrumbItem key={href} href={href}>
          {title === "faq" ? "FAQ" : titleize(title)}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

export default Breadcrumber
