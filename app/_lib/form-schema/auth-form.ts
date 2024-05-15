import { z } from "zod"

export const loginFormSchema = z.object({
  emailOrPhone: z
    .string()
    .min(10, "Email or phone number must be at least 10 characters long")
    .max(255, "Email or phone number must be at most 255 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export const logoutFormSchema = z.void()

export const registerFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    dateOfBirth: z.string().optional(),
    role: z.string().optional(),
    gender: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type LogoutFormSchema = z.infer<typeof logoutFormSchema>
export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>
export type RegisterFormSchema = z.infer<typeof registerFormSchema>
