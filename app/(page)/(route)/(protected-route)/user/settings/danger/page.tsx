"use client"
import { ScreenLoader } from "@/_components"
import { Button, Divider } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React, { useState } from "react"

const DeleteAccountModal = dynamic(() => import("./_components").then((r) => r.DeleteAccountModal), {
  ssr: false,
  loading: () => <ScreenLoader />
})

const Page = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div>
        <h3 className='text-lg font-semibold'>Privacy settings</h3>
        <p className='text-sm'>Manage your privacy settings to control what we can do with your data.</p>
      </div>
      <Divider />
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <p className='text-sm'>
          Delete account request <span className='text-red-500'>[Danger]</span>
        </p>
        <Button color='danger' radius='sm' size='sm' onPress={() => setVisible(true)}>
          Delete account
        </Button>
      </div>
      {visible && <DeleteAccountModal onClose={() => setVisible(false)} visible={visible} />}
    </>
  )
}

export default Page
