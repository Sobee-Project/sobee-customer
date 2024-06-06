"use client"
import RatingStars from "@/(page)/(route)/_components/RatingStarts"
import { createReview } from "@/_actions"
import {
  CreateReviewFormSchema,
  EditReviewFormSchema,
  createReviewformSchema,
  editReviewformSchema
} from "@/_lib/form-schema"
import { IReview } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure
} from "@nextui-org/react"
import { Trash2, UploadCloud } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const CloudinaryPlugin = dynamic(() => import("@/_plugins/CloudinaryPlugin/CloudinaryPlugin"), {
  ssr: false,
  loading: () => <Spinner />
})

type Props = {
  type?: "new" | "edit"
  data?: IReview
  visible: boolean
  onClose: () => void
}

const ReviewForm = ({ type = "new", data, visible, onClose }: Props) => {
  const isEdit = type === "edit"
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CreateReviewFormSchema | EditReviewFormSchema>({
    resolver: zodResolver(isEdit ? editReviewformSchema : createReviewformSchema),
    defaultValues: data as any
  })
  const {
    onClose: _onClose,
    isOpen,
    onOpenChange
  } = useDisclosure({
    isOpen: visible,
    onClose
  })
  const [showCloudinary, setShowCloudinary] = useState(false)

  const { execute: executeCreateReview, isExecuting: isCreating } = useAction(createReview, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Review created successfully")
        _onClose()
      } else {
        toast.error(data.message)
      }
    }
  })

  const onSubmit = (data: CreateReviewFormSchema | EditReviewFormSchema) => {
    isEdit ? console.log("Edit review", data) : executeCreateReview(data)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{type === "new" ? "Add Review" : "Edit Review"}</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <RatingStars initialRating={watch("rating") || 0} onChange={(rating) => setValue("rating", rating)} />
                {errors.rating && <p className='text-sm text-danger-500'>{errors.rating.message}</p>}
                <Textarea
                  {...register("content")}
                  label='Content'
                  placeholder='Enter review cotent'
                  errorMessage={errors.content?.message}
                  isInvalid={!!errors.content}
                />
                {watch("assets") && watch("assets")?.length! > 0 ? (
                  <div className='flex flex-wrap gap-4'>
                    {watch("assets")?.map((asset, index) => (
                      <div key={index} className='relative rounded border p-2'>
                        <Image src={asset} alt={`asset-${index}`} width={100} height={100} />
                        <Button
                          size='sm'
                          onClick={() => {
                            setValue(
                              "assets",
                              (watch("assets") as string[]).filter((_, i) => i !== index)
                            )
                          }}
                          type='button'
                          isIconOnly
                          color='danger'
                          variant='light'
                          className='absolute right-2 top-2'
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button
                    size='sm'
                    onClick={() => setShowCloudinary(true)}
                    type='button'
                    startContent={<UploadCloud size={20} />}
                  >
                    Upload Assets
                  </Button>
                )}
                {showCloudinary && (
                  <CloudinaryPlugin
                    multiple={true}
                    onUploadSuccess={({ urls }) => {
                      setValue("assets", urls)
                      setShowCloudinary(false)
                    }}
                    visible={showCloudinary}
                    assetType='image'
                    folder={`reviews/orders/${data?._id! || ""}`}
                    onClose={() => setShowCloudinary(false)}
                  />
                )}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleSubmit(onSubmit)}
                type='submit'
                color='primary'
                isLoading={isCreating}
                disabled={isCreating}
              >
                {type === "new" ? "Submit" : "Save"}
              </Button>
              <Button onClick={onClose} type='button' isLoading={isCreating} disabled={isCreating} variant='light'>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ReviewForm
