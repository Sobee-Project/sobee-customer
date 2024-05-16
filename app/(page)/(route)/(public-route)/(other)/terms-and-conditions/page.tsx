import { fetchAllTerms } from "@/_actions"
import { ITerm } from "@/_lib/interfaces"
import { TermsList } from "./_components"

const page = async () => {
  let data = [] as ITerm[]
  const res = await fetchAllTerms()
  if (res.success) {
    data = res.data!
  }
  return <TermsList terms={data} />
}

export default page
