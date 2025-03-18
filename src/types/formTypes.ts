import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export const signupFormSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(8, "Name must be at least 8 characters long")
})

export type SignupFormSchema = z.infer<typeof signupFormSchema>

export const commentFormSchema = z.object({
  comment: z.string().min(1)
})

export type CommentFormSchema = z.infer<typeof commentFormSchema>

export const captionFormSchema = z.object({
  caption: z.string().optional()
})

export type CaptionFormSchema = z.infer<typeof captionFormSchema>