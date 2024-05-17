import { APP_ROUTES } from "@/_constants"
import { Button } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='grid max-h-screen min-h-screen grid-cols-1 md:grid-cols-[60%_auto]'>
      <Button
        className='absolute left-4 top-4'
        as={Link}
        href={APP_ROUTES.HOME}
        variant='light'
        startContent={<ChevronLeft />}
      >
        Back to home
      </Button>
      {children}
    </div>
  )
}

export default layout
