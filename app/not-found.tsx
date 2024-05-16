import { Link as UILink } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { APP_ROUTES } from "./_constants"
const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8'>
      <h1 className='text-center text-2xl font-semibold'>The page you are looking for is not found.</h1>
      <Image src={"/404.svg"} alt='404' width={400} height={400} priority />
      <UILink as={Link} href={APP_ROUTES.HOME} underline='always' className='p-8'>
        Take me home
      </UILink>
    </div>
  )
}

export default NotFound
