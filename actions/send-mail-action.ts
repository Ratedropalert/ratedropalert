"use server";
import rateAlertNotifyEmail from "@/components/mail-template/contact-alert-email";
import { RateAlertFormData } from "@/schema/rate-alert-schema";
import { Resend } from "resend";

const resend = new Resend('re_iqqbN5DD_KvChUSUShzTTBvzs2iFWarH2');
const ADMIN_EMAIL = 'trivedi710@gmail.com';

export async function sendContactAlertEmail(data: RateAlertFormData) {
  try {
    const result = await resend.emails.send({
      from: "Rate Drop Alert <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `Rate Drop Alert • ${data.first_name} ${data.last_name || ""}`,
      html: rateAlertNotifyEmail(data),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true, data: result.data };
  } catch (err: any) {
    console.error("Email action error:", err);
    return { success: false, error: err.message || "Email failed to send" };
  }
}
