"use client"
import { createQuestion, editQuestion } from "@/_actions"
import { CreateQuestionForm, EditQuestionForm } from "@/_lib/form-schema"
import { IQuestion } from "@/_lib/interfaces"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  visible: boolean
  onClose: () => void
  type?: "new" | "edit"
  question?: IQuestion
}

const ProductQuestionModal = ({ onClose, visible, type = "new", question }: Props) => {
  const {
    isOpen,
    onClose: _onClose,
    onOpenChange
  } = useDisclosure({
    isOpen: visible,
    onClose
  })

  const [content, setContent] = useState("")
  const params = useParams()

  useEffect(() => {
    if (question) {
      setContent(question.content)
    }
  }, [question])

  const { execute, status } = useAction((type === "new" ? createQuestion : editQuestion) as any, {
    onSuccess: ({ data }) => {
      //@ts-ignore
      if (data.success) {
        _onClose()
        //@ts-ignore
        toast.success(data.message)
      } else {
        //@ts-ignore
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = () => {
    if (!content) return toast.error("Please enter a question")
    if (content.length < 10) return toast.error("Question should be at least 10 characters long")
    type === "new"
      ? execute({ content, product: params.id.toString() } as CreateQuestionForm)
      : execute({ content, _id: question?._id! } as EditQuestionForm)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{type === "new" ? "Ask a question" : "Edit question"}</ModalHeader>
            <ModalBody>
              <Textarea
                placeholder='Type your question here'
                description='Your question should not contain contact information such as email, phone or external web links.'
                value={content}
                onValueChange={setContent}
              />
            </ModalBody>
            <ModalFooter>
              <Button isLoading={isLoading} onPress={onSubmit} isDisabled={content.length < 10} color='primary'>
                Submit
              </Button>
              <Button onClick={onClose} isDisabled={isLoading} variant='light'>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ProductQuestionModal
