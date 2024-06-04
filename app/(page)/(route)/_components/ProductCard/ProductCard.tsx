"use client"
import { createOrderItem, toggleFavorite } from "@/_actions"
import { APP_ROUTES, COOKIES_KEY } from "@/_constants"
import { EProductType } from "@/_lib/enums"
import { IBrand, ICategory, IVariant } from "@/_lib/interfaces"
import { cn, formatCurrency } from "@/_lib/utils"
import { productInitialState as productCardInitialState, productReducer as productCardReducer } from "@/_reducer"
import { useCartStore, useFavoriteStore } from "@/_store"
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react"
import { Heart, Minus, Plus, ShoppingBasket } from "lucide-react"
import { useCookies } from "next-client-cookies"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useMemo, useOptimistic, useReducer, useState } from "react"
import toast from "react-hot-toast"
import RatingStars from "../RatingStarts"
import { ProductCardProps } from "./ProductCard.type"

const ProductCard = ({ product }: ProductCardProps) => {
  const { addOrderItem, isInCart } = useCartStore()
  const { isFavorite, toggleFavorite } = useFavoriteStore()
  const [isLoading, setIsLoading] = useState(false)

  const variants = product.variants as IVariant[]
  const brand = product.brand ? (product.brand as IBrand) : null
  const category = product.category as ICategory
  const cookies = useCookies()
  const userId = cookies.get(COOKIES_KEY.USER_ID_KEY)

  const [{ quantity, selectedVariants }, dispatch] = useReducer(productCardReducer, productCardInitialState)

  const isFavoriteByUser = isFavorite(product._id!)
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(isFavoriteByUser, (state) => !state)

  const isProductInCart = isInCart(product._id!)

  const _toggleFavorite = useCallback(async () => {
    if (!userId) {
      toast.error("Please login to add to favorite")
      return
    }
    toggleOptimisticFavorite(isFavoriteByUser)
    await toggleFavorite(product._id!)
  }, [isFavoriteByUser, product._id, toggleFavorite, toggleOptimisticFavorite, userId])

  const optimizedData = useMemo(
    () => [
      {
        name: "size",
        values: [...new Set(variants.map((v) => v.size))]
      },
      {
        name: "color",
        values: [...new Set(variants.map((v) => v.color))]
      }
    ],
    [variants]
  )

  const getSelectedVariants = useMemo(() => {
    if (!selectedVariants.color || !selectedVariants.size) return {} as IVariant
    return (
      variants.find((v) => v.color === selectedVariants.color && v.size === selectedVariants.size) || ({} as IVariant)
    )
  }, [selectedVariants, variants])

  const calculateDiscount = useCallback(
    (price: number = 0) => {
      const discount = product.discount || 0
      return price - (price * discount) / 100
    },
    [product.discount]
  )

  const discountPrice = useMemo(() => {
    return product.type === EProductType.SIMPLE
      ? [calculateDiscount(product.displayPrice)]
      : [calculateDiscount(product.minPrice), calculateDiscount(product.maxPrice)]
  }, [calculateDiscount, product.displayPrice, product.maxPrice, product.minPrice, product.type])

  const renderDiscountPrice = useCallback(() => {
    return discountPrice.map((v) => formatCurrency(v * quantity)).join(" - ")
  }, [discountPrice, quantity])

  const renderPrice = useCallback(() => {
    return (
      product.type === EProductType.SIMPLE ? [product.displayPrice] : [product.minPrice || 0, product.maxPrice || 0]
    )
      .map((v) => formatCurrency(v * quantity))
      .join(" - ")
  }, [product.displayPrice, product.maxPrice, product.minPrice, product.type, quantity])

  const onPressAddToCart = useCallback(async () => {
    setIsLoading(true)
    if (product.isVariation) {
      await addOrderItem({
        product: product._id!,
        amount: quantity,
        color: selectedVariants.color,
        size: selectedVariants.size
      })
    } else {
      await addOrderItem({
        product: product._id!,
        amount: quantity
      })
    }
    setIsLoading(false)
  }, [addOrderItem, product, selectedVariants, quantity])

  return (
    <Card className='h-full min-w-60 transition-transform hover:scale-[1.008]' shadow='sm'>
      <CardHeader className='relative'>
        {product.isDiscount && (
          <Chip className='absolute right-0 top-0 z-[2]' radius='md' color='danger' size='lg'>
            <span className=''>Discount {(product.discount || 0) * 100}%</span>
          </Chip>
        )}
        {userId && (
          <Button
            className='group absolute left-4 top-4 z-[2] bg-background'
            radius='full'
            variant='light'
            size='lg'
            isIconOnly
            onPress={_toggleFavorite}
          >
            <Heart
              size={20}
              className={cn(
                "group-hover:fill-danger-400 group-hover:stroke-danger-400",
                optimisticFavorite ? "fill-danger-400 stroke-danger-400" : "fill-none stroke-current"
              )}
            />
          </Button>
        )}
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={400}
          height={400}
          className='h-60 w-full rounded-md bg-white object-contain'
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <Link
            href={APP_ROUTES.PRODUCTS.ID.replace(":id", product.slug!)}
            className='min-h-14 w-fit text-foreground transition-colors hover:text-primary'
          >
            <h3 className='line-clamp-2 text-xl font-semibold' title={product.name}>
              {product.name}
            </h3>
          </Link>
          <Link
            href={APP_ROUTES.CATEGORIES.ID.replace(":id", category._id!)}
            className='w-fit text-slate-400 transition-colors hover:text-slate-200'
          >
            #{category.name}
          </Link>
          {brand && (
            <Link
              href={APP_ROUTES.BRANDS.ID.replace(":id", brand._id!)}
              className='flex w-fit items-center gap-2 text-sm'
            >
              <Avatar src={brand.logo} size='sm' />
              <span className='w-fit text-base text-primary-400 transition-colors hover:text-primary-100'>
                {brand.name}
              </span>
            </Link>
          )}
          <div className='mt-2 flex items-center gap-2'>
            <RatingStars initialRating={product.ratingValue || 0} starClassName='' readOnly />
            <p className='text-sm text-gray-500'>
              ({product.ratingCount} rating{(product.ratingCount || 0) > 1 ? "s" : ""})
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <h4
            className={cn(
              "line-clamp-1 flex-1",
              product.isDiscount ? "text-lg text-gray-400 line-through" : "text-3xl font-medium text-primary"
            )}
          >
            {renderPrice()}
          </h4>
          {product.isDiscount && <h4 className=' flex-1 text-3xl font-medium text-primary'>{renderDiscountPrice()}</h4>}
        </div>
      </CardBody>
      <CardFooter className='gap-2'>
        <div className='flex flex-1 items-center gap-1'>
          <Button
            isIconOnly
            size='sm'
            variant='light'
            onPress={() =>
              dispatch({
                type: "SET_QUANTITY",
                payload: quantity - 1
              })
            }
            isDisabled={quantity <= 1}
          >
            <Minus size={16} />
          </Button>
          <Input
            className='w-10'
            placeholder='1'
            classNames={{
              input: "text-center"
            }}
            value={quantity.toString()}
            onValueChange={(v) =>
              dispatch({
                type: "SET_QUANTITY",
                payload: Number(v)
              })
            }
          />
          <Button
            isIconOnly
            size='sm'
            variant='light'
            onPress={() =>
              dispatch({
                type: "SET_QUANTITY",
                payload: quantity + 1
              })
            }
            isDisabled={quantity >= product.quantity}
          >
            <Plus size={16} />
          </Button>
        </div>
        {product.type === EProductType.SIMPLE ? (
          <Button
            startContent={<ShoppingBasket size={16} />}
            variant='ghost'
            color='primary'
            className='flex-1'
            radius='sm'
            onPress={onPressAddToCart}
            isLoading={isLoading}
            isDisabled={isLoading || product.quantity === 0}
          >
            Add to Cart
          </Button>
        ) : (
          <Popover showArrow isDismissable={!isLoading}>
            <PopoverTrigger>
              <Button
                startContent={<ShoppingBasket size={16} />}
                variant='ghost'
                color='primary'
                className='flex-1'
                radius='sm'
              >
                Add to Cart
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2'>
                {optimizedData.map((variant) => {
                  return (
                    <div key={variant.name}>
                      <p className='text-sm capitalize'>{variant.name}</p>
                      <div className='flex flex-wrap gap-1'>
                        {variant.values.map((val) => (
                          <Button
                            key={val}
                            size='sm'
                            color={selectedVariants[variant.name] === val ? "primary" : "default"}
                            className='h-6 min-w-14 cursor-pointer py-1'
                            style={
                              variant.name === "color"
                                ? {
                                    backgroundColor: val
                                  }
                                : {}
                            }
                            radius='full'
                            variant={"bordered"}
                            onPress={() =>
                              dispatch({ type: "SET_SELECTED_VARIANTS", payload: { [variant.name]: val } })
                            }
                          >
                            {variant.name !== "color" ? val : ""}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className={cn("grid", (getSelectedVariants.assets || [])?.length > 1 && "grid-cols-2")}>
                  {(getSelectedVariants.assets || []).map((asset) => (
                    <Image
                      src={asset!}
                      alt={product.name}
                      width={100}
                      height={100}
                      key={asset}
                      className='size-40 object-contain'
                    />
                  ))}
                </div>
                {getSelectedVariants.amount && (
                  <p>
                    <span className='font-medium'>{getSelectedVariants.amount}</span> left in stock.
                  </p>
                )}
                <Button
                  color='primary'
                  isDisabled={
                    !selectedVariants.color ||
                    !selectedVariants.size ||
                    isLoading ||
                    product.quantity === 0 ||
                    getSelectedVariants.amount === 0
                  }
                  size='sm'
                  radius='sm'
                  onPress={onPressAddToCart}
                  isLoading={isLoading}
                >
                  Get
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
