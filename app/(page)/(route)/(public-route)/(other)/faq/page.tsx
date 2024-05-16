import { fetchAllFaqs } from "@/_actions"
import { IFaq } from "@/_lib/interfaces"
import React from "react"
import { FAQList } from "./_components"

const page = async () => {
  let data = [] as IFaq[]
  const res = await fetchAllFaqs()
  if (res.success) {
    data = res.data!
  }
  return <FAQList faqs={data} />
}

export default page
