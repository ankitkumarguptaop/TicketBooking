import { z } from "zod";

export const registerSchema = z
  .object({
    // Limits mirror the API's RegisterUserRequestDto so errors show before submitting.
    fullName: z.string().trim().min(2, "Enter your full name").max(100, "Use at most 100 characters"),
    email: z.email("Enter a valid email address").max(320, "Use at most 320 characters"),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Use 10-15 digits, optionally starting with +"),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(72, "Use at most 72 characters")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
