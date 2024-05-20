import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  category: ICategory
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={APP_ROUTES.CATEGORIES.ID.replace(":id", category.slug)}
      className='transition-transform hover:scale-[1.008]'
    >
      <Card className='min-w-32' shadow='sm'>
        <CardHeader className='justify-center'>
          <Image
            src={category.image!}
            alt={category.name}
            width={100}
            height={100}
            className='size-28 rounded-full border object-contain object-center'
          />
        </CardHeader>
        <CardBody>
          <h3 className='text-center font-medium'>{category.name}</h3>
        </CardBody>
      </Card>
    </Link>
  )
}

export default CategoryCard
