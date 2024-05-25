import Image from "next/image"

const Page = () => {
  return (
    <>
      <h1 className='text-center text-2xl font-semibold'>
        The requested resource could not be found but may be available in the future.
      </h1>
      <Image src={"/400.svg"} alt='401' width={400} height={400} priority />
    </>
  )
}

export default Page
