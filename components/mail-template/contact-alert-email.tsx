import { RateAlertFormData } from "@/schema/rate-alert-schema";

export default function rateAlertNotifyEmail(data: RateAlertFormData) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Rate Alert Request</title>
    </head>

    <body style="margin:0; padding:0; background:#f5f7fb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb; padding: 24px 0;">
        <tr>
          <td align="center">

            <!-- Main Container -->
            <table width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.06);">

              <!-- Header -->
              <tr>
                <td
                  style="padding: 22px 24px; background: linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%); color:#fff;">
                  <h2 style="margin:0; font-size:20px; font-family: Arial, sans-serif;">
                    📉 New Rate Alert Request
                  </h2>
                  <p style="margin:6px 0 0; font-size:13px; opacity:0.95; font-family: Arial, sans-serif;">
                    A user submitted a new mortgage rate alert request.
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 22px 24px; font-family: Arial, sans-serif; color:#111827;">

                  <p style="margin:0 0 14px; font-size:14px; color:#374151;">
                    Here are the submitted details:
                  </p>

                  <!-- Details Table -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 10px; overflow:hidden;">

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; width: 200px; font-size:13px; color:#6b7280;">
                        Full Name
                      </td>
                      <td style="padding: 12px 14px; font-size:14px; color:#111827;">
                        ${data.first_name} ${data.last_name || ""}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Email
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        <a href="mailto:${data.email}" style="color:#2563eb; text-decoration:none;">
                          ${data.email}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Phone
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.phone}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Target Rate
                      </td>
                      <td style="padding: 12px 14px; font-size:15px; font-weight:bold; color:#16a34a;">
                        ${data.target_rate}%
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Property Type
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.property_type}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Occupancy Type
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.occupancy_type}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Credit Score
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.estimated_credit_score}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Current Loan Amount
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        $${data.current_loan_amount.toLocaleString()}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Estimated Property Value
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        $${data.estimated_property_value.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Email Alerts
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.email_alerts ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 14px; background:#f9fafb; font-size:13px; color:#6b7280;">
                        Allow Offers
                      </td>
                      <td style="padding: 12px 14px; font-size:14px;">
                        ${data.allow_offers ? "Yes" : "No"}
                      </td>
                    </tr>
                  </table>

                  <!-- CTA -->
                  <div style="margin-top: 20px; padding-top: 18px; border-top: 1px solid #e5e7eb;">
                    <p style="margin:0 0 10px; font-size:13px; color:#6b7280;">
                      Quick actions:
                    </p>

                    <a href="mailto:${data.email}"
                      style="display:inline-block; padding: 10px 14px; background:#111827; color:#fff; text-decoration:none; border-radius:10px; font-size:13px; margin-right:8px;">
                      Reply
                    </a>

                    <a href="tel:${data.phone}"
                      style="display:inline-block; padding: 10px 14px; background:#2563eb; color:#fff; text-decoration:none; border-radius:10px; font-size:13px;">
                      Call
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 18px 24px; background:#f9fafb; font-family: Arial, sans-serif;">
                  <p style="margin:0; font-size:12px; color:#6b7280; text-align:center;">
                    Automated Rate Alert Notification • ${new Date().getFullYear()}
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
