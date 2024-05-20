"use client"
import { cn } from "@/_lib/utils"
import { ClassValue } from "clsx"
import React, { useCallback, useState } from "react"

type RatingStarsProps = {
  initialRating: number
  onClick?: (rating: number) => void
  onChange?: (rating: number) => void
  onHover?: (rating: number) => void
  canHover?: boolean
  readOnly?: boolean
  containerClassName?: ClassValue
  starClassName?: ClassValue
}

const RatingStars = ({
  initialRating,
  onClick,
  onChange,
  onHover,
  containerClassName,
  starClassName,
  canHover = true,
  readOnly = false
}: RatingStarsProps) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = useCallback(
    (newRating: number) => {
      if (readOnly) return
      setRating(newRating)
      onClick?.(newRating)
      onChange?.(newRating)
    },
    [onClick, onChange, readOnly]
  )

  const handleMouseEnter = useCallback(
    (newRating: number) => {
      if (canHover && !readOnly) {
        setHoverRating(newRating)
        if (onHover) {
          onHover(newRating)
        }
      }
    },
    [canHover, onHover, readOnly]
  )

  const handleMouseLeave = useCallback(() => {
    if (canHover && !readOnly) {
      setHoverRating(0)
    }
  }, [canHover, readOnly])

  const getStarClass = (index: number) => {
    const effectiveRating = hoverRating || rating
    if (effectiveRating >= index + 1) {
      return "text-yellow-500"
    } else {
      return "text-gray-300 dark:text-gray-700"
    }
  }

  return (
    <div className={cn("flex", containerClassName)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={cn("relative", readOnly ? "cursor-default" : "cursor-pointer")}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
        >
          <span className={cn(`block text-2xl ${getStarClass(index)}`, starClassName)}>&#9733;</span>
        </div>
      ))}
    </div>
  )
}

export default RatingStars
