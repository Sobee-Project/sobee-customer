"use client"
import { ScreenLoader } from "@/_components"
import { COOKIES_KEY } from "@/_constants"
import { IQuestion } from "@/_lib/interfaces"
import { Button } from "@nextui-org/react"
import { useCookies } from "next-client-cookies"
import dynamic from "next/dynamic"
import { useState } from "react"
import QuestionCard from "./QuestionCard"

const ProductQuestionModal = dynamic(() => import("./ProductQuestionModal"), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  questions: IQuestion[]
}

const ProductQuestions = ({ questions }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const cookies = useCookies()
  const userId = cookies.get(COOKIES_KEY.USER_ID_KEY)

  return (
    <div className='my-8'>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='mb-4 text-xl font-semibold'>Questions ({questions.length})</h2>
        {userId && (
          <Button variant='flat' onClick={() => setShowModal(true)}>
            Ask a question
          </Button>
        )}
        {showModal && <ProductQuestionModal visible={showModal} onClose={() => setShowModal(false)} />}
      </div>
      <div className='space-y-4'>
        {questions.length === 0 ? (
          <p>No questions yet</p>
        ) : (
          questions.map((question) => <QuestionCard question={question} key={question._id} />)
        )}
      </div>
    </div>
  )
}

export default ProductQuestions
