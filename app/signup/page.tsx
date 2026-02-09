import RateAlertForm from "@/components/forms/rate-alert-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen relative selection:bg-emerald-500 selection:text-black">
      <div className="bg-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black -z-10" />
      <div className="max-w-6xl mx-auto w-full px-6 py-8 space-y-8">
        <Button className="text-slate-500 hover:text-white hover:bg-black/20 transition-colors text-sm bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          <Link href="/" className="flex items-center gap-2 ">
            <ArrowLeft className="w-4 h-4" /> Back to Story
          </Link>
        </Button>

        <RateAlertForm />
      </div>
    </div>
  );
}
