import { z } from "zod";

export const requestResetSchema = z.object({
  email: z.email("Enter a valid email address").max(320, "Use at most 320 characters"),
});

export type RequestResetValues = z.infer<typeof requestResetSchema>;
