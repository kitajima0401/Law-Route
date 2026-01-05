import { z } from "zod";

export const searchSchema = z.object({
  keyword: z.string().min(1, "キーワードを入力してください。")
})

export type SearchSchema = z.infer<typeof searchSchema>