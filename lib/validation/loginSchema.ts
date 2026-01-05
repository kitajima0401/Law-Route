import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("メールアドレスが不正です"),
  password: z.string().min(6, "6文字以上で入力してください。")
})

export type LoginSchema = z.infer<typeof loginSchema>