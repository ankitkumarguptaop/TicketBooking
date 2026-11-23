import { z } from "zod";

export const changePasswordSchema = z
  .object({
    code: z.string().regex(/^[0-9]{6}$/, "Enter the 6-digit code"),
    // Same rules as the register form.
    newPassword: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "Use at most 72 characters")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
