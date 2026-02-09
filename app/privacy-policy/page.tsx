import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 py-20 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <section className="space-y-6">
                    <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                    <p className="text-slate-400">We respect your privacy.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Information we collect:</h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li>Email address (required)</li>
                        <li>Phone number (optional, for SMS alerts)</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">How we use your information:</h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li>To send rate alerts you request</li>
                        <li>To communicate service-related updates only</li>
                    </ul>
                </section>

                <section className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                        We do not sell, rent, or share your personal information with third parties for marketing purposes.
                    </p>
                    <p>
                        You may unsubscribe or request deletion of your data at any time.
                    </p>
                    <p className="pt-4 font-bold text-slate-200">
                        Contact: support@ratedropalert.com
                    </p>
                </section>
            </div>
        </main>
    );
}
