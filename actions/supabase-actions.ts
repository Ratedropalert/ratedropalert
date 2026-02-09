"use server";

import { supabase } from "@/lib/supabase";
import { RateAlertFormData } from "@/schema/rate-alert-schema";

export async function saveRateAlert(data: RateAlertFormData) {
    try {
        const { data: result, error } = await supabase
            .from('rate_alerts')
            .insert([
                {
                    target_rate: data.target_rate,
                    first_name: data.first_name,
                    last_name: data.last_name || "",
                    phone: data.phone,
                    email: data.email,
                    property_type: data.property_type,
                    occupancy_type: data.occupancy_type,
                    estimated_credit_score: data.estimated_credit_score,
                    current_loan_amount: data.current_loan_amount,
                    estimated_property_value: data.estimated_property_value,
                    email_alerts: data.email_alerts,
                    allow_offers: data.allow_offers,
                }
            ])
            .select()

        if (error) {
            console.error("Supabase primary insert error:", error)

            // Fallback: Try inserting without the new fields in case the table hasn't been updated yet
            const { data: fallbackResult, error: fallbackError } = await supabase
                .from('rate_alerts')
                .insert([
                    {
                        target_rate: data.target_rate,
                        first_name: data.first_name,
                        last_name: data.last_name || "",
                        phone: data.phone,
                        email: data.email,
                        property_type: data.property_type,
                        occupancy_type: data.occupancy_type,
                        estimated_credit_score: data.estimated_credit_score,
                        current_loan_amount: data.current_loan_amount,
                        estimated_property_value: data.estimated_property_value,
                    }
                ])
                .select()

            if (fallbackError) {
                console.error("Supabase fallback insert error:", fallbackError)
                return { success: false, error: fallbackError.message }
            }

            return { success: true, data: fallbackResult, warning: "New columns missing in DB" }
        }

        return { success: true, data: result }
    } catch (err: any) {
        console.error("Action error:", err)
        return { success: false, error: err.message || "Unknown error occurred" }
    }
}
