"use client"
import { changeAvatar } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { Avatar, Button } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import React, { useState } from "react"

const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  avatar: string
}

const ChangeAvatar = ({ avatar }: Props) => {
  const [showModal, setShowModal] = useState(false)

  const { execute } = useAction(changeAvatar)

  return (
    <>
      <div className='flex max-w-sm flex-col items-center gap-4'>
        <Avatar size='lg' src={avatar} alt='avatar' />
        <Button size='sm' variant='flat' radius='sm' onPress={() => setShowModal(true)}>
          Choose a new avatar
        </Button>
        <p className='max-w-60 text-xs'>
          For best results, use an image at least 128px by 128px in .jpg format. Maximum file size is 1MB.
        </p>
      </div>
      {showModal && (
        <CloudinaryPlugin
          assetType='image'
          onClose={() => setShowModal(false)}
          visible={showModal}
          onUploadSuccess={({ urls }) => {
            execute({ avatar: urls[0] })
          }}
          multiple={false}
          folder='avatars'
        />
      )}
    </>
  )
}

export default ChangeAvatar
