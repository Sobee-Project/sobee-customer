"use client"
import { Checkbox, CheckboxGroup } from "@nextui-org/react"
import React, { useState } from "react"
import { notificationSettingMock } from "../notification.mock"

const NotificationsSettingsForm = () => {
  const [checkedSettings, setCheckedSettings] = useState<string[]>(notificationSettingMock.map((v) => v.checkKey))
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-semibold'>Email notifications</h3>
      <CheckboxGroup value={checkedSettings} onValueChange={setCheckedSettings}>
        {notificationSettingMock.map(({ checkKey, label, subLabel }) => (
          <Checkbox key={checkKey} value={checkKey} color='primary'>
            <div className='flex flex-col'>
              <span className='font-medium'>{label}</span>
              <span className='text-sm text-gray-600 dark:text-slate-300'>{subLabel}</span>
            </div>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  )
}

export default NotificationsSettingsForm
