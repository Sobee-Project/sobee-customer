"use client"
import { IFaq } from "@/_lib/interfaces"
import { Accordion, AccordionItem } from "@nextui-org/react"
import React from "react"

type Props = {
  faqs: IFaq[]
}

const FAQList = ({ faqs }: Props) => {
  return faqs.length === 0 ? (
    <div>There are no FAQs available</div>
  ) : (
    <Accordion variant='splitted'>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={faq._id}
          title={<span className='line-clamp-1 text-sm font-medium sm:text-base'>{faq.title}</span>}
          className='text-gray-600 dark:text-slate-300'
        >
          {faq.description}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FAQList
