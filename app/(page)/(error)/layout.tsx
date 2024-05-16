import { APP_ROUTES } from "@/_constants"
import { LayoutParamsProps } from "@/_lib/params"
import { Link as UILink } from "@nextui-org/react"
import Link from "next/link"

const layout = ({ children }: LayoutParamsProps) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      {children}
      <UILink as={Link} href={APP_ROUTES.HOME} underline='always' className='p-8'>
        Take me home
      </UILink>
    </div>
  )
}

export default layout
