import { z } from "zod";

/** Spaces, dashes and brackets are for reading; the API wants digits only. */
export function normalisePhone(phone: string): string {
  return phone.replace(/[\s()-]/g, "");
}

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100, "Use at most 100 characters"),
  // Typed the way people write it ("+91 98765 43210"), checked the way the API stores it.
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+?[0-9]{10,15}$/.test(normalisePhone(value)), "Use 10-15 digits, optionally starting with +"),
});

export type ProfileValues = z.infer<typeof profileSchema>;
