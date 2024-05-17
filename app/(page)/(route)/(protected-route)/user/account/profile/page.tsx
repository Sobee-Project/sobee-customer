import { getCurrentUser } from "@/_actions"
import { Divider } from "@nextui-org/react"
import React from "react"
import { ChangeAvatar, UpdateInformationForm } from "./_components"

const page = async () => {
  const res = await getCurrentUser()
  const user = res.data!.user
  return (
    <>
      <div>
        <h3 className='text-lg font-semibold'>My profile</h3>
        <p className='text-sm'>Manage your profile information to protect your account.</p>
      </div>
      <Divider />
      <div className='flex flex-wrap-reverse justify-center gap-4 p-4 md:justify-start md:p-8'>
        <UpdateInformationForm user={user} />
        <ChangeAvatar avatar={user.avatar} />
      </div>
    </>
  )
}

export default page
