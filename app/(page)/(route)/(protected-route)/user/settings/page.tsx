import { APP_ROUTES } from "@/_constants"
import { redirect } from "next/navigation"

const page = () => {
  redirect(APP_ROUTES.USER.SETTINGS.NOTIFICATION)
}

export default page
