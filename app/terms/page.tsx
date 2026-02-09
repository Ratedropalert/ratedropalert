import React from "react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 py-20 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <section className="space-y-6">
                    <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
                    <p className="text-slate-400">By using RateDropAlert, you agree to the following:</p>
                </section>

                <section className="space-y-4">
                    <ul className="list-disc pl-6 space-y-4 text-slate-400">
                        <li><span className="text-slate-200 font-bold">Informational Only:</span> Alerts are for informational purposes only and do not constitute financial advice.</li>
                        <li><span className="text-slate-200 font-bold">No Guarantees:</span> Rate accuracy or availability is not guaranteed. Rates fluctuate based on market conditions.</li>
                        <li><span className="text-slate-200 font-bold">Personal Responsibility:</span> You are responsible for your own financial decisions. Always consult with a licensed mortgage professional.</li>
                        <li><span className="text-slate-200 font-bold">Service Changes:</span> Service availability may change without notice.</li>
                    </ul>
                </section>

                <section className="pt-8 border-t border-white/10 text-slate-500 italic">
                    <p>
                        RateDropAlert is provided &quot;as-is&quot; without warranties of any kind.
                    </p>
                </section>
            </div>
        </main>
    );
}
