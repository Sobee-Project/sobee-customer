import { COOKIES_KEY } from "@/_constants"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  cookies().delete(COOKIES_KEY.ACCESS_TOKEN_KEY)
  cookies().delete(COOKIES_KEY.REFRESH_TOKEN_KEY)
  cookies().delete(COOKIES_KEY.USER_ID_KEY)
  return Response.json({ message: "Cookies deleted" })
}
