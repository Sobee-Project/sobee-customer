import { fetchAllFaqs, fetchAllTerms } from "@/_actions"
import { IFaq, ITerm } from "@/_lib/interfaces"
import { ParamsProps } from "@/_lib/params"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"

const FAQList = dynamic(() => import("./_components").then((r) => r.FAQList), {
  loading: () => <Spinner />
})
const TermsList = dynamic(() => import("./_components").then((r) => r.TermsList), {
  loading: () => <Spinner />
})

const page = async ({ params }: ParamsProps) => {
  const { policyType } = params
  let res
  let RenderComponent
  switch (policyType) {
    case "terms-and-conditions":
      res = await fetchAllTerms()
      RenderComponent = <TermsList terms={res.data ?? []} />
      break
    case "faq":
      res = await fetchAllFaqs()
      RenderComponent = <FAQList faqs={res.data ?? []} />
      break
    default:
      break
  }

  return <div>{RenderComponent}</div>
}

export default page
