"use client";

import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { RateAlertFormData, rateAlertSchema } from "@/schema/rate-alert-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Check } from "lucide-react";
import { sendContactAlertEmail } from "@/actions/send-mail-action";
import { saveRateAlert } from "@/actions/supabase-actions";

export default function RateAlertForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RateAlertFormData>({
    mode: "onChange",
    resolver: zodResolver(rateAlertSchema),
    defaultValues: {
      target_rate: 5.75,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      property_type: "Single Family",
      occupancy_type: "Primary Residence",
      estimated_credit_score: "760+",
      current_loan_amount: 0,
      estimated_property_value: 0,
      email_alerts: true,
      allow_offers: false,
    },
  });

  const targetRate = useWatch({
    control,
    name: "target_rate",
  });

  const onSubmit = async (data: RateAlertFormData) => {
    try {
      // Save to Supabase first
      const dbResult = await saveRateAlert(data);
      if (!dbResult.success) {
        toast.error(`Database Error: ${dbResult.error}`);
        return;
      }

      // Then send the email
      const emailResult = await sendContactAlertEmail(data);
      if (!emailResult.success) {
        // We still consider it a "success" if it's in DB but email failed, 
        // but we should warn the user.
        toast.warning(`Alert set, but notification email failed: ${emailResult.error}`);
      } else {
        toast.success("Rate alert created successfully");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to create rate alert. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-xl mx-auto border-none bg-slate-900/50 shadow-2xl backdrop-blur-xl text-slate-200 p-8 text-center">
        <CardContent className="space-y-6 pt-6">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white">Thank You!</h2>
          <p className="text-slate-400 text-lg">
            Your rate alert has been set. We&apos;ll notify you as soon as rates reach your target of <span className="text-white font-bold">{targetRate}%</span>.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              reset();
            }}
            className="mt-8 bg-slate-800 hover:bg-slate-700 text-white"
          >
            Set Another Alert
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto border-none bg-slate-900/50 shadow-2xl backdrop-blur-xl text-slate-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wide">
            Target Rate
          </CardTitle>
          <div className="text-3xl font-bold text-white">{targetRate}%</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Target Rate Slider */}

          <Controller
            name="target_rate"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="relative pt-2 pb-2"
                data-invalid={fieldState.invalid}
              >
                <Slider
                  value={[field.value]}
                  max={8}
                  min={4}
                  step={0.125}
                  onValueChange={(val) => field.onChange(val[0])}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>4.0%</span>
                  <span className="font-semibold text-slate-300">
                    {field.value}%
                  </span>
                  <span>8.0%</span>
                </div>
                <div className="text-center text-sm text-slate-400 mt-2">
                  We&apos;ll alert you when rates reach your target.
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="h-px bg-slate-800 w-full" />

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="first_name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-slate-400 font-normal"
                  >
                    First Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-slate-600 focus:ring-slate-600/20 h-12"
                    placeholder="First Name"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-xs"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="last_name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-slate-400 font-normal"
                  >
                    Last Name <span className="text-slate-600">(optional)</span>
                  </FieldLabel>
                  <Input
                    id={field.name}
                    {...field}
                    className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-slate-600 focus:ring-slate-600/20 h-12"
                    placeholder="Last Name"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-xs"
                    />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Contact Fields */}

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-slate-400 font-normal"
                >
                  Mobile Phone
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-slate-600 focus:ring-slate-600/20 h-12"
                  placeholder="Mobile Phone"
                />
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                  By providing your phone number, you consent to receive rate alerts via SMS. Message and data rates may apply.
                </p>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs mt-1"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-slate-400 font-normal"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  className="bg-slate-950/50 border-slate-800 text-slate-200 focus:border-slate-600 focus:ring-slate-600/20 h-12"
                  placeholder="Email"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs mt-1"
                  />
                )}
              </Field>
            )}
          />

          {/* Property Type */}

          <Controller
            name="property_type"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2" data-invalid={fieldState.invalid}>
                <FieldLabel className="text-slate-400">
                  Property Type
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full bg-slate-950/50 border-slate-800 text-slate-200 focus:ring-slate-600/20 h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-200 ">
                    <SelectItem value="Single Family">Single Family</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs"
                  />
                )}
              </Field>
            )}
          />

          {/* Occupancy Type */}

          <Controller
            name="occupancy_type"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2" data-invalid={fieldState.invalid}>
                <FieldLabel className="text-slate-400">
                  Occupancy Type
                </FieldLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-0 bg-slate-950/50 p-1 rounded-md border border-slate-800"
                >
                  {["Primary Residence", "Second Home", "Investment"].map(
                    (option) => (
                      <div key={option} className="relative">
                        <RadioGroupItem
                          value={option}
                          id={`occ-${option}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`occ-${option}`}
                          className={cn(
                            "flex items-center justify-center w-full py-2.5 text-sm cursor-pointer rounded-sm transition-all",
                            field.value === option
                              ? "bg-slate-700/80 text-white shadow-sm font-medium"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                          )}
                        >
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs"
                  />
                )}
              </Field>
            )}
          />

          {/* Credit Score */}

          <Controller
            name="estimated_credit_score"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2" data-invalid={fieldState.invalid}>
                <FieldLabel className="text-slate-400">
                  Estimated Credit Score
                </FieldLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-2"
                >
                  {["760+", "720-759", "680-719", "640-679", "Below 640"].map(
                    (option) => (
                      <div
                        key={option}
                        className="relative flex-1 min-w-[80px]"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`cs-${option}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`cs-${option}`}
                          className={cn(
                            "flex items-center justify-center w-full py-2.5 px-1 text-sm cursor-pointer rounded-md border transition-all text-center",
                            field.value === option
                              ? "bg-slate-800 border-slate-600 text-white font-medium"
                              : "bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700",
                          )}
                        >
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs"
                  />
                )}
              </Field>
            )}
          />

          {/* Financials */}
          <Controller
            name="estimated_property_value"
            control={control}
            render={({ field, fieldState }) => {
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const numeric = e.target.value.replace(/\D/g, "");
                field.onChange(numeric ? Number(numeric) : undefined);
              };

              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex items-center justify-between"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-slate-400 font-normal"
                  >
                    Estimated Property Value
                  </FieldLabel>
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <Input
                      id={field.name}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={field.value ?? ""}
                      onChange={handleChange}
                      className="pl-6 text-right font-bold bg-transparent border-b border-b-slate-800 text-white focus-visible:border-b focus-visible:border-b-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="current_loan_amount"
            control={control}
            render={({ field, fieldState }) => {
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const numeric = e.target.value.replace(/\D/g, "");
                field.onChange(numeric ? Number(numeric) : undefined);
              };

              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex items-center justify-between"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-slate-400 font-normal"
                  >
                    Current Loan Amount
                  </FieldLabel>

                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <Input
                      id={field.name}
                      type="text" // avoids spinner
                      inputMode="numeric" // numeric keyboard on mobile
                      pattern="[0-9]*"
                      placeholder="0"
                      value={field.value ?? ""} // controlled value
                      onChange={handleChange}
                      className="pl-6 text-right font-bold bg-transparent border-b border-b-slate-800 text-white focus-visible:border-b focus-visible:border-b-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          {/* Checkboxes */}
          <div className="space-y-4">
            <Controller
              name="email_alerts"
              control={control}
              render={({ field }) => (
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-slate-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1"
                  />
                  <Label
                    htmlFor={field.name}
                    className="text-slate-400 font-normal leading-tight cursor-pointer"
                  >
                    Send me email alerts when my target rate is reached
                  </Label>
                </div>
              )}
            />

            <Controller
              name="allow_offers"
              control={control}
              render={({ field }) => (
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-slate-600 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1"
                  />
                  <Label
                    htmlFor={field.name}
                    className="text-slate-400 font-normal leading-tight cursor-pointer"
                  >
                    When my target rate is reached, allow lenders to send me offers.
                  </Label>
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-lg bg-linear-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border-t border-slate-600 shadow-lg"
          >
            {isSubmitting ? "Submitting..." : "Set My Rate Alert"}
          </Button>

          <p className="text-center text-xs text-slate-500 mt-4">
            100% free • No spam • Opt out anytime
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
