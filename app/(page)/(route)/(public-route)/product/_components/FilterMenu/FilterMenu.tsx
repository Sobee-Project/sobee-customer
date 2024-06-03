"use client"
import RatingStars from "@/(page)/(route)/_components/RatingStarts"
import { APP_ROUTES } from "@/_constants"
import { EProductSize } from "@/_lib/enums"
import { ICategory } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { convertToQuery } from "@/_utils"
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider
} from "@nextui-org/react"
import { ListFilter, Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { filterMenuInitialState, filterMenuReducer } from "./FilterMenu.reducer"

type Props = {
  categories: ICategory[]
  colors: string[]
}

const LeftSideBar = ({ categories, colors }: Props) => {
  const [showMenu, setShowMenu] = useState(false)

  const sizes = Object.values(EProductSize)

  const sorts = [
    {
      label: "Price: Low to High",
      key: "displayPrice-asc"
    },
    {
      label: "Price: High to Low",
      key: "displayPrice-desc"
    },
    {
      label: "Rating: Low to High",
      key: "ratingValue-asc"
    },
    {
      label: "Rating: High to Low",
      key: "ratingValue-desc"
    },
    {
      label: "Newest",
      key: "createdAt-desc"
    },
    {
      label: "Oldest",
      key: "createdAt-asc"
    },
    {
      label: "Best Selling",
      key: "sold-desc"
    },
    {
      label: "Most Popular",
      key: "ratingCount-desc"
    }
  ]

  const [
    {
      categories: selectedCategories,
      colors: selectedColors,
      priceRange: selectedPriceRange,
      sizes: selectedSizes,
      ratings: selectedRatings,
      sortBy,
      isOnSale,
      keyword
    },
    dispatch
  ] = useReducer(filterMenuReducer, filterMenuInitialState)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const keyword = searchParams.get("keyword")
    const categories = searchParams.getAll("categories")
    const colors = searchParams.getAll("colors")
    const priceRange = searchParams.getAll("priceRange").map((v) => parseInt(v))
    const sizes = searchParams.getAll("sizes")
    const ratings = searchParams.getAll("ratings")
    const sortBy = searchParams.get("sortBy")
    const isOnSale = searchParams.get("isOnSale") === "true"

    dispatch({
      type: "SET_CATEGORIES",
      payload: categories || ["All"]
    })
    dispatch({
      type: "SET_COLORS",
      payload: colors || ["All"]
    })
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: priceRange.length === 2 ? priceRange : [1, 1000]
    })
    dispatch({
      type: "SET_SIZES",
      payload: sizes || ["All"]
    })
    dispatch({
      type: "SET_RATINGS",
      payload: ratings || ["All"]
    })
    dispatch({
      type: "SET_SORT_BY",
      payload: sortBy || "createdAt-desc"
    })
    dispatch({
      type: "SET_IS_ON_SALE",
      payload: isOnSale
    })
    dispatch({
      type: "SET_KEYWORD",
      payload: keyword || ""
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const query = useMemo(
    () =>
      [
        convertToQuery("categories", selectedCategories),
        convertToQuery("colors", selectedColors),
        convertToQuery("priceRange", selectedPriceRange),
        convertToQuery("sizes", selectedSizes),
        convertToQuery("ratings", selectedRatings),
        convertToQuery("isOnSale", isOnSale),
        convertToQuery("sortBy", sortBy),
        convertToQuery("keyword", keyword)
      ].join("&"),
    [isOnSale, keyword, selectedCategories, selectedColors, selectedPriceRange, selectedRatings, selectedSizes, sortBy]
  )
  const onApplyFilter = useCallback(() => {
    router.replace(APP_ROUTES.PRODUCTS.INDEX + "?" + query)
    setShowMenu(false)
  }, [query, router])

  const onSort = useCallback(
    (val: string) => {
      dispatch({ type: "SET_SORT_BY", payload: val })
      router.replace(APP_ROUTES.PRODUCTS.INDEX + "?" + query)
      setShowMenu(false)
    },
    [query, router]
  )

  const onSearch = useCallback(() => {
    router.replace(APP_ROUTES.PRODUCTS.INDEX + "?" + query)
    setShowMenu(false)
  }, [router, query])

  const onReset = useCallback(() => {
    dispatch({ type: "RESET_FILTER" })
    router.replace(APP_ROUTES.PRODUCTS.INDEX)
  }, [router])

  return (
    <>
      {!showMenu && (
        <Button
          variant='solid'
          color='secondary'
          radius='sm'
          className='fixed bottom-20 right-6 z-20 p-2 lg:hidden'
          onPress={() => setShowMenu((prev) => !prev)}
          startContent={<ListFilter size={20} />}
        >
          Filter
        </Button>
      )}
      <div
        className={cn(
          "fixed inset-0 z-20 overflow-auto bg-black bg-opacity-50 transition-opacity",
          showMenu ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setShowMenu(false)}
      >
        <Button
          variant='solid'
          radius='full'
          className='fixed right-4 top-20 z-30 p-2'
          onPress={() => setShowMenu(false)}
          isIconOnly
        >
          <X />
        </Button>
      </div>

      <div
        className={cn(
          "fixed z-50 max-h-[90vh] w-64 overflow-auto rounded border bg-background transition-transform scrollbar-hide lg:sticky lg:top-20 lg:z-auto lg:block lg:w-80 lg:!translate-x-0 lg:self-start",
          showMenu ? "translate-x-0" : "-translate-x-[200%]"
        )}
      >
        <div>
          <Input
            label='Search'
            labelPlacement='outside'
            placeholder='apple, samsung, chanel,...'
            classNames={{
              mainWrapper: "p-4",
              label: "text-base font-semibold"
            }}
            endContent={<Search className='cursor-pointer' onClick={onSearch} />}
            onValueChange={(v) => dispatch({ type: "SET_KEYWORD", payload: v })}
            value={keyword}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Divider />
        <Select
          label='Sort by'
          labelPlacement='outside'
          placeholder='Sort by'
          classNames={{
            mainWrapper: "p-4",
            label: "text-base font-semibold"
          }}
          selectionMode='single'
          disallowEmptySelection
          selectedKeys={[sortBy]}
          onChange={(e) => onSort(e.target.value)}
        >
          {sorts.map((sort) => (
            <SelectItem key={sort.key} value={sort.key}>
              {sort.label}
            </SelectItem>
          ))}
        </Select>
        <Divider />
        <div className='flex flex-col gap-4 p-4'>
          <h3 className='text-lg font-semibold'>Filter</h3>
          <Slider
            label='Price'
            classNames={{
              label: "text-base text-foreground-500"
            }}
            showTooltip
            minValue={1}
            maxValue={1000}
            step={1}
            value={selectedPriceRange}
            formatOptions={{ style: "currency", currency: "USD" }}
            onChange={(value) => dispatch({ type: "SET_PRICE_RANGE", payload: value })}
          />
          <div>
            <p className='text-foreground-500'>Sale</p>
            <Checkbox isSelected={isOnSale} onValueChange={(v) => dispatch({ type: "SET_IS_ON_SALE", payload: v })}>
              Is on sale
            </Checkbox>
          </div>
          <CheckboxGroup
            label={"Categories"}
            value={selectedCategories}
            onValueChange={(value) => dispatch({ type: "SET_CATEGORIES", payload: value })}
          >
            <Checkbox key={"All"} value={"All"}>
              All
            </Checkbox>
            {categories.map((category) => (
              <Checkbox key={category._id} value={category._id!}>
                {category.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            label={"Colors"}
            value={selectedColors}
            onValueChange={(value) => dispatch({ type: "SET_COLORS", payload: value })}
          >
            <Checkbox key={"All"} value={"All"}>
              All
            </Checkbox>
            {colors.map((color) => (
              <Checkbox key={color.replace("#", "")} value={color.replace("#", "")}>
                <Chip
                  size='sm'
                  className='min-w-20 border'
                  style={{
                    backgroundColor: color
                  }}
                />
              </Checkbox>
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            label={`Sizes`}
            value={selectedSizes}
            onValueChange={(value) => dispatch({ type: "SET_SIZES", payload: value })}
          >
            <Checkbox key={"All"} value={"All"}>
              All
            </Checkbox>
            {sizes.map((size) => (
              <Checkbox key={size} value={size}>
                {size}
              </Checkbox>
            ))}
          </CheckboxGroup>
          <CheckboxGroup
            label={`Ratings`}
            value={selectedRatings}
            onValueChange={(value) => dispatch({ type: "SET_RATINGS", payload: value })}
          >
            <Checkbox key={"All"} value={"All"}>
              All
            </Checkbox>
            {[5, 4, 3, 2, 1, 0].map((rating) => (
              <Checkbox key={rating} value={rating.toString()}>
                <RatingStars initialRating={rating} readOnly />
              </Checkbox>
            ))}
          </CheckboxGroup>
          <div className='flex gap-2'>
            <Button variant='solid' color='primary' radius='sm' className='flex-1' onPress={onApplyFilter}>
              Apply
            </Button>
            <Button variant='light' radius='sm' className='flex-1' onPress={onReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSideBar
