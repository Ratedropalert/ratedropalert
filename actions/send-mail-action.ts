"use server";
import rateAlertNotifyEmail from "@/components/mail-template/contact-alert-email";
import { RateAlertFormData } from "@/schema/rate-alert-schema";
import { Resend } from "resend";

const resend = new Resend('re_iqqbN5DD_KvChUSUShzTTBvzs2iFWarH2');
const ADMIN_EMAIL = 'trivedi710@gmail.com';

export async function sendContactAlertEmail(data: RateAlertFormData) {
  return await resend.emails.send({
    from: "Rate Drop Alert <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `Rate Drop Alert • ${data.first_name} ${data.last_name}`,
    html: rateAlertNotifyEmail(data),
  });
}
