"use client"
import RatingStars from "@/(page)/(route)/_components/RatingStarts"
import { createOrderItem, toggleFavorite } from "@/_actions"
import { COOKIES_KEY } from "@/_constants"
import { EProductType } from "@/_lib/enums"
import { IProduct } from "@/_lib/interfaces"
import { cn, formatCurrency } from "@/_lib/utils"
import { productInitialState, productReducer } from "@/_reducer"
import { Button, Input, Tooltip } from "@nextui-org/react"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCookies } from "next-client-cookies"
import { useAction } from "next-safe-action/hooks"
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  product: IProduct
}

const ProductDetails = ({ product }: Props) => {
  const [{ quantity, selectedVariants }, dispatch] = useReducer(productReducer, productInitialState)

  const cookies = useCookies()
  const userId = cookies.get(COOKIES_KEY.USER_ID_KEY)
  const isFavoriteByUser = userId ? product.favoritesBy?.includes(userId) : false

  const optimizedVariants = useMemo(
    () => [
      {
        name: "size",
        values: [...new Set((product.variants || []).map((v) => v.size))]
      },
      {
        name: "color",
        values: [...new Set((product.variants || []).map((v) => v.color))]
      }
    ],
    [product.variants]
  )

  const calculateDiscount = useCallback(
    (price: number = 0) => {
      const discount = product.discount || 0
      return price - price * discount
    },
    [product.discount]
  )

  const discountPrice = useMemo(() => {
    return product.type === EProductType.SIMPLE
      ? [calculateDiscount(product.displayPrice)]
      : [calculateDiscount(product.minPrice), calculateDiscount(product.maxPrice)]
  }, [calculateDiscount, product])

  const renderDiscountPrice = useCallback(() => {
    return discountPrice.map((v) => formatCurrency(v * quantity)).join(" - ")
  }, [discountPrice, quantity])

  const renderPrice = useCallback(() => {
    return (
      product.type === EProductType.SIMPLE ? [product.displayPrice] : [product.minPrice || 0, product.maxPrice || 0]
    )
      .map((v) => formatCurrency(v * quantity))
      .join(" - ")
  }, [product, quantity])

  const getViaSelectedVariants = useMemo(() => {
    const color = selectedVariants.color
    const size = selectedVariants.size
    const variant = product.variants?.find((v) => v.color === color && v.size === size)
    return variant
  }, [product, selectedVariants])

  const { execute } = useAction(toggleFavorite, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message)
      }
    }
  })

  useEffect(() => {
    if (getViaSelectedVariants) {
      if (quantity > getViaSelectedVariants.amount) {
        dispatch({
          type: "SET_QUANTITY",
          payload: getViaSelectedVariants.amount
        })
      }
    }
  }, [getViaSelectedVariants, quantity])

  const { status, execute: executeCreateOrderItem } = useAction(createOrderItem, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Added to cart")
        console.log(data)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onPressAddToCart = useCallback(() => {
    if (product.isVariation) {
      executeCreateOrderItem({
        product: product._id!,
        amount: quantity,
        color: selectedVariants.color,
        size: selectedVariants.size
      })
    } else {
      executeCreateOrderItem({
        product: product._id!,
        amount: quantity
      })
    }
  }, [executeCreateOrderItem, product, selectedVariants, quantity])

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <h1 className='flex-1 text-2xl font-bold'>
            <span className='text-warning-500'>
              {product.isDiscount ? `[-${(product.discount || 0) * 100}%] ` : " "}
            </span>
            {product.name}
          </h1>
          <Tooltip
            content={!isFavoriteByUser ? "Add to favorite" : "Remove from favorite"}
            placement='bottom'
            showArrow
          >
            <Button
              className='group bg-background'
              radius='full'
              variant='light'
              size='lg'
              isIconOnly
              onPress={() => execute(product._id!)}
            >
              <Heart
                className={cn(
                  "group-hover:fill-danger-400 group-hover:stroke-danger-400",
                  isFavoriteByUser ? "fill-danger-400 stroke-danger-400" : "stroke-current"
                )}
              />
            </Button>
          </Tooltip>
        </div>
        <div className='flex items-center gap-2'>
          <RatingStars initialRating={product.ratingValue || 0} readOnly />
          <p className='text-gray-400'>{product.ratingCount} reviews</p>
        </div>
        <p>{product.shortDescription}</p>
        <div className='flex flex-col gap-1'>
          <h4
            className={cn(
              "line-clamp-1 flex-1",
              product.isDiscount ? "text-lg text-gray-400 line-through" : "text-3xl font-medium text-primary"
            )}
          >
            {getViaSelectedVariants ? formatCurrency(getViaSelectedVariants.price * quantity) : renderPrice()}
          </h4>
          {product.isDiscount && (
            <h4 className=' flex-1 text-3xl font-medium text-primary'>
              {getViaSelectedVariants
                ? formatCurrency(quantity * calculateDiscount(getViaSelectedVariants.price))
                : renderDiscountPrice()}
            </h4>
          )}
        </div>
        {product.type !== EProductType.SIMPLE && (
          <div className='space-y-2'>
            {optimizedVariants.map((variant) => {
              return (
                <div key={variant.name} className='space-y-1'>
                  <p className='capitalize'>{variant.name}</p>
                  <div className='flex flex-wrap gap-1'>
                    {variant.values.map((val) => (
                      <Button
                        key={val}
                        size='sm'
                        color={selectedVariants[variant.name] === val ? "primary" : "default"}
                        className='h-8 min-w-14 cursor-pointer py-1 text-base'
                        style={
                          variant.name === "color"
                            ? {
                                backgroundColor: val
                              }
                            : {}
                        }
                        radius='full'
                        variant={"bordered"}
                        onPress={() => dispatch({ type: "SET_SELECTED_VARIANTS", payload: { [variant.name]: val } })}
                      >
                        {variant.name !== "color" ? val : ""}
                      </Button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {getViaSelectedVariants && (
          <p>
            <span className='font-medium'>{getViaSelectedVariants.amount}</span> available products
          </p>
        )}
        <div className='flex gap-4'>
          <div className='flex items-center gap-1 rounded-full'>
            <Button
              radius='full'
              isIconOnly
              variant='bordered'
              onPress={() =>
                dispatch({
                  type: "SET_QUANTITY",
                  payload: quantity - 1
                })
              }
              isDisabled={quantity <= 1 || isLoading}
            >
              <Minus size={16} />
            </Button>
            <Input
              className='w-10'
              placeholder='1'
              classNames={{
                input: "text-center text-base font-medium"
              }}
              variant='underlined'
              value={quantity.toString()}
              onValueChange={(v) =>
                dispatch({
                  type: "SET_QUANTITY",
                  payload: v === "" ? 1 : Number(v)
                })
              }
              isDisabled={isLoading}
            />
            <Button
              radius='full'
              isIconOnly
              variant='bordered'
              onPress={() =>
                dispatch({
                  type: "SET_QUANTITY",
                  payload: quantity + 1
                })
              }
              isDisabled={
                (product.type === EProductType.VARIABLE &&
                  (!getViaSelectedVariants || (getViaSelectedVariants && quantity >= getViaSelectedVariants.amount))) ||
                isLoading
              }
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button
            color='primary'
            className='flex-1 rounded-full'
            size='lg'
            startContent={<ShoppingBag />}
            isDisabled={(product.type === EProductType.VARIABLE && !getViaSelectedVariants) || isLoading}
            isLoading={isLoading}
            onPress={onPressAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <div className='col-span-2 my-8'>
        <h3 className='mb-4 text-xl font-semibold'>Product Details</h3>
        <p>{product.description}</p>
      </div>
    </>
  )
}

export default ProductDetails
