import { z } from "zod";

export const otpLength = 6;

export const otpSchema = z.object({
  code: z.string().regex(/^[0-9]{6}$/, "Enter the 6-digit code"),
});

export type OtpValues = z.infer<typeof otpSchema>;
