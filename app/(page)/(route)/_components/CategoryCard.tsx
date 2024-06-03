"use client"
import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { countableText } from "@/_utils"
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  category: ICategory
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div className='transition-transform hover:scale-[1.008]'>
      <Card className='min-w-32 p-0' shadow='sm' radius='sm'>
        <CardHeader className='justify-center p-0'>
          <Image
            src={category.image!}
            alt={category.name}
            width={200}
            height={200}
            quality={100}
            className='h-40 w-full border-b object-cover object-center'
          />
        </CardHeader>
        <CardBody>
          <h3 className='mb-4 text-center font-medium'>{category.name}</h3>
          <Button
            as={Link}
            href={APP_ROUTES.CATEGORIES.ID.replace(":id", category._id!)}
            radius='full'
            color='primary'
            fullWidth
          >
            View {category.productCount || 0} {countableText(category.productCount || 0, "product", "products")}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default CategoryCard
