import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "名前を入力してください。"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります。")
})

export type RegisterSchema = z.infer<typeof registerSchema>