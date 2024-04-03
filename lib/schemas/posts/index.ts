import { z } from "zod";

export const postsValidationSchema = z.object({
  title: z.string().trim().min(3),
  content: z.string().trim().min(3),
});

export type RegisterFormValues = z.infer<typeof postsValidationSchema>;
