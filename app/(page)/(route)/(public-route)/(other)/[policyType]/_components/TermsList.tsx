"use client"
import { ITerm } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Link } from "@nextui-org/react"
import { useEffect, useState } from "react"

type Props = {
  terms: ITerm[]
}

const FAQList = ({ terms }: Props) => {
  const [hash, setHash] = useState<string>("")

  useEffect(() => {
    setHash(window.location.hash.split("#")[1] ?? "")
  }, [])

  return terms.length === 0 ? (
    <div>There are no Terms available</div>
  ) : (
    <div className='flex gap-8'>
      <aside className='sticky top-24 hidden w-96 flex-col gap-4 self-start md:flex'>
        {terms.map((term, index) => (
          <Link
            key={term._id}
            href={`#${term.slug}`}
            onClick={() => setHash(term.slug || "")}
            color={hash === term.slug ? "primary" : "foreground"}
            className='text-lg'
          >
            {term.title}
          </Link>
        ))}
      </aside>
      <div className='space-y-4 rounded-md bg-white p-4 shadow'>
        {terms.map((term, index) => (
          <div key={term._id}>
            <h2
              id={term.slug}
              className={cn("text-2xl font-semibold", hash === term.slug && "mb-2 text-primary transition-colors")}
            >
              {term.title}
            </h2>
            <p className='text-gray-600'>{term.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQList
