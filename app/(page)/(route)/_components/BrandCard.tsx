import { APP_ROUTES } from "@/_constants"
import { IBrand } from "@/_lib/interfaces"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  brand: IBrand
}

const BrandCard = ({ brand }: Props) => {
  return (
    <Link href={APP_ROUTES.BRANDS.ID.replace(":id", brand.slug)} className='transition-transform hover:scale-[1.008]'>
      <Card className='md:min-w-32' shadow='sm'>
        <CardHeader className='justify-center'>
          <Image
            src={brand.logo!}
            alt={brand.name}
            width={100}
            height={100}
            className='size-28 self-center rounded-full border object-contain'
          />
        </CardHeader>
        <CardBody>
          <h3 className='text-center font-medium'>{brand.name}</h3>
        </CardBody>
      </Card>
    </Link>
  )
}

export default BrandCard
