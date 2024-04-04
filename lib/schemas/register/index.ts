import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/.test(
          value ?? ""
        ),
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export type RegisterFormValues = z.infer<typeof registerValidationSchema>;

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[!@#$%^&*:;'><.,/?}{[\]\-_+=])(?=.{8,})/.test(
          value ?? ""
        ),
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export type LoginFormValues = z.infer<typeof loginValidationSchema>;
