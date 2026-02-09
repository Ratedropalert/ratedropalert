import { z } from "zod";

export const rateAlertSchema = z.object({
  target_rate: z.number().min(1, "Target rate is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email("Email is invalid"),
  property_type: z.enum([
    "Single Family",
    "Townhouse",
    "Condo",
    "Multi-Family",
  ] as const),
  occupancy_type: z.enum([
    "Primary Residence",
    "Second Home",
    "Investment",
  ] as const),
  estimated_credit_score: z.enum([
    "760+",
    "720-759",
    "680-719",
    "640-679",
    "Below 640",
  ] as const),
  current_loan_amount: z.number().min(1, "Current loan amount is required"),
  estimated_property_value: z
    .number()
    .min(1, "Estimated property value is required"),
  email_alerts: z.boolean(),
  allow_offers: z.boolean(),
});

export type RateAlertFormData = z.infer<typeof rateAlertSchema>;
