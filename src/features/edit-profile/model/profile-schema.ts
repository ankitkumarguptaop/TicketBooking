import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  // Spaces are allowed so "+91 98765 43210" reads the way people type it.
  phone: z.string().trim().regex(/^\+?\d[\d ]{8,16}\d$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city"),
});

export type ProfileValues = z.infer<typeof profileSchema>;
