import { APP_ROUTES } from "@/_constants"
import { ECouponApplyType, ECouponType } from "@/_lib/enums"
import { ICoupon } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { Button, Card, CardBody, CardFooter, Progress } from "@nextui-org/react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  coupon: ICoupon
}

const CouponCard = ({ coupon }: Props) => {
  return (
    <Card className='w-full' shadow='sm'>
      <CardBody className='justify-between gap-4 sm:flex-row'>
        <Image
          src={coupon.image}
          alt={coupon.code}
          width={100}
          height={100}
          className='size-24 rounded-full border object-contain object-center'
        />
        <div className='flex-1'>
          <p className='text-lg font-semibold'>{coupon.code}</p>

          <p className='text-sm'>
            Discount{" "}
            <span className='font-medium'>
              {coupon.type === ECouponType.PERCENTAGE
                ? `${coupon.discountValue}%`
                : `${formatCurrency(coupon.discountValue)}`}{" "}
            </span>
            for {coupon.applyTo}{" "}
            {coupon.applyTo === ECouponApplyType.ALL || coupon.productApply.length > 1 ? "products" : "product"} with
            min order value is <span className='font-medium'>{formatCurrency(coupon.minOrderValue)}</span>
            <p className='text-sm'>Expired at: {format(coupon.endDate, "dd/MM/yyyy 'at' HH:mm")}</p>
          </p>
          <Progress
            value={(coupon.usageCount / coupon.usageLimit) * 100}
            color='warning'
            label={`${coupon.usageCount}/${coupon.usageLimit} used`}
            classNames={{
              label: "text-sm text-right w-full"
            }}
          />
        </div>
        <Button variant='solid' color='primary' radius='sm'>
          Save
        </Button>
      </CardBody>
    </Card>
  )
}

export default CouponCard
