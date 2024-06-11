import { APP_ROUTES } from "@/_constants"
import { ECouponApplyType, ECouponType } from "@/_lib/enums"
import { ICoupon } from "@/_lib/interfaces"
import { formatCurrency } from "@/_lib/utils"
import { Button, Card, CardBody, CardFooter, Progress } from "@nextui-org/react"
import { format } from "date-fns"
import { Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  coupon: ICoupon
  action?: "save" | "apply"
  onRemove?: (coupon: ICoupon) => void
}

const CouponCard = ({ coupon, action = "save", onRemove = () => {} }: Props) => {
  return (
    <Card className='w-full' shadow='sm'>
      <CardBody className='justify-between gap-4 sm:flex-row'>
        <Link href={APP_ROUTES.COUPONS.ID.replace(":id", coupon.code!)}>
          <Image
            src={coupon.image}
            alt={coupon.code}
            width={100}
            height={100}
            className='size-24 rounded-full border bg-white object-contain object-center'
          />
        </Link>
        <div className='flex-1'>
          <Link href={APP_ROUTES.COUPONS.ID.replace(":id", coupon.code)}>
            <p className='text-lg font-semibold'>{coupon.code}</p>
          </Link>
          <div className='text-sm'>
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
          </div>
          <Progress
            value={(coupon.usageCount / coupon.usageLimit) * 100}
            color='warning'
            label={`${coupon.usageCount}/${coupon.usageLimit} used`}
            classNames={{
              label: "text-sm text-right w-full"
            }}
          />
        </div>
        {action === "save" ? (
          <></>
        ) : (
          <Button variant='light' color='danger' radius='sm' isIconOnly onPress={() => onRemove(coupon)}>
            <Trash2Icon size={20} />
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default CouponCard
