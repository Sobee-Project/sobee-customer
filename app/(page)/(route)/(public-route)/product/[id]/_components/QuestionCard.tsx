"use client"
import { deleteQuestion, likeQuestion, likeQuestionReply } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { COOKIES_KEY } from "@/_constants"
import { IQuestion, IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Avatar, Button, Divider, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react"
import { format } from "date-fns"
import { Heart, ThumbsUp } from "lucide-react"
import { useCookies } from "next-client-cookies"
import { useAction, useOptimisticAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import toast from "react-hot-toast"

const ProductQuestionModal = dynamic(() => import("./ProductQuestionModal"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  question: IQuestion
}

const QuestionCard = ({ question }: Props) => {
  const customer = question.customer as IUser
  const answer = question.answer
  const cookies = useCookies()
  const userId = cookies.get(COOKIES_KEY.USER_ID_KEY)
  const isLiked = question.likes?.includes(userId!)
  const isAnswerLiked = answer?.likes?.includes(userId!)
  const isCurrentUser = userId === customer._id

  const { isOpen, onClose, onOpenChange } = useDisclosure()
  const [showModal, setShowModal] = useState(false)

  const { execute: likeQuestionExecute, status: likeQuestionStatus } = useAction(likeQuestion, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message)
      }
    }
  })

  const { execute: likeQuestionReplyExecute, status: likeQuestionReplyStatus } = useAction(likeQuestionReply, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message)
      }
    }
  })

  const { execute: deleteQuestionExecute, status: deleteQuestionStatus } = useAction(deleteQuestion, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        onClose()
      } else {
        toast.error(data.message)
      }
    }
  })

  const handleLikeQuestion = () => {
    likeQuestionExecute(question._id!)
  }

  const handleLikeAnswer = () => {
    likeQuestionReplyExecute(question._id!)
  }

  const handleDeleteQuestion = () => {
    deleteQuestionExecute(question._id!)
  }

  return (
    <div>
      <div className='flex gap-2'>
        <Avatar src={customer.avatar} alt={customer.name} />
        <div className='flex-1 space-y-1'>
          <p className='text-sm'>{customer.name}</p>
          <p className='text-xs text-foreground-500'>
            {format(new Date(question.createdAt!), "dd/MM/yyyy 'at' HH:mm")}
          </p>
          <p>{question.content}</p>
          <div className='flex items-center gap-2'>
            <Heart
              size={16}
              className={cn(
                "cursor-pointer text-foreground transition-colors hover:fill-danger-500 hover:text-danger-500",
                isLiked && "fill-danger-500 text-danger-500"
              )}
              onClick={handleLikeQuestion}
            />
            <span className='text-sm'>
              <span className='font-medium'>{question.likes?.length}</span> likes
            </span>
            {userId && isCurrentUser && (
              <>
                <Divider orientation='vertical' className='h-4' />
                <button className='text-sm text-primary-500 hover:underline' onClick={() => setShowModal(true)}>
                  Edit question
                </button>
                {showModal && (
                  <ProductQuestionModal
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    question={question}
                    type='edit'
                  />
                )}
                <Divider orientation='vertical' className='h-4' />
                <Popover placement='top-start' isOpen={isOpen} onOpenChange={onOpenChange}>
                  <PopoverTrigger>
                    <button className='text-sm text-danger-500 hover:underline'>Delete</button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='space-y-2 p-2'>
                      <p>Are you sure you want to delete this question?</p>
                      <div className='flex items-center  gap-2'>
                        <Button size='sm' color='primary' onClick={onClose}>
                          Cancel
                        </Button>
                        <Button size='sm' color='danger' variant='light' onClick={handleDeleteQuestion}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
            {userId && !isCurrentUser && (
              <>
                <Divider orientation='vertical' className='h-4' />
                <button className='text-sm text-danger-500'>Report spam</button>
              </>
            )}
          </div>
        </div>
      </div>
      {answer && (
        <div className='ml-10 mt-2 space-y-1 rounded bg-foreground-100 p-2'>
          <p className='text-sm'>Reply of seller</p>
          <p className='text-xs text-foreground-500'>{format(new Date(answer.updatedAt!), "dd/MM/yyyy 'at' HH:mm")}</p>
          <p>{answer.content}</p>
          {userId && (
            <div className='flex items-center gap-2'>
              <Heart
                size={16}
                className={cn(
                  "cursor-pointer text-foreground transition-colors hover:fill-danger-500 hover:text-danger-500",
                  isAnswerLiked && "fill-danger-500 text-danger-500"
                )}
                onClick={handleLikeAnswer}
              />
              <span className='text-sm'>
                <span className='font-medium'>{answer.likes?.length}</span> likes
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
