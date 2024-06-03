import { APP_ROUTES } from "@/_constants"
import { IBrand } from "@/_lib/interfaces"
import { countableText } from "@/_utils"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  brand: IBrand
}

const BrandCard = ({ brand }: Props) => {
  return (
    <div className='transition-transform hover:scale-[1.008]'>
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
          <h3 className='mb-4 line-clamp-1 text-center font-medium'>{brand.name}</h3>
          <Button
            as={Link}
            href={APP_ROUTES.CATEGORIES.ID.replace(":id", brand._id!)}
            radius='full'
            color='primary'
            fullWidth
          >
            View {brand.productCount || 0} {countableText(brand.productCount || 0, "product", "products")}
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default BrandCard
