import { Divider } from "@nextui-org/react"
import React from "react"
import { NotificationsSettingsForm } from "./_components"

const page = () => {
  return (
    <>
      <h3 className='text-lg font-semibold'>Notifications settings</h3>
      <Divider />
      <NotificationsSettingsForm />
    </>
  )
}

export default page
