import React from "react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 py-20 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <section className="space-y-6">
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                    <div className="space-y-4 text-slate-400 leading-relaxed">
                        <p>
                            RateDropAlert was built to solve one simple problem: most people miss mortgage rate drops because they happen quietly and fast.
                        </p>
                        <p>
                            We track market rate movements and notify you when rates move in your favor — so you don’t have to refresh rate pages every day or rely on headlines that arrive too late.
                        </p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Our goal is simple:</h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-400">
                        <li>Help homebuyers and homeowners stay informed</li>
                        <li>Send timely alerts when rates change</li>
                        <li>Keep the service free, simple, and spam-free</li>
                    </ul>
                </section>

                <section className="space-y-4 text-slate-400 leading-relaxed">
                    <p>
                        RateDropAlert is an independent rate-monitoring service created for people who want better timing — not pressure.
                    </p>
                    <div className="pt-4 border-t border-white/10 space-y-1">
                        <p><span className="text-slate-200 font-bold">Business Name:</span> RateDropAlert</p>
                        <p><span className="text-slate-200 font-bold">Founder:</span> Rahul Trivedi</p>
                        <p><span className="text-slate-200 font-bold">Contact:</span> support@ratedropalert.com</p>
                    </div>
                </section>

                <section className="space-y-6 pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white">How Rate Alerts Work</h2>
                    <p className="text-slate-400">
                        RateDropAlert monitors publicly available mortgage rate indicators and market signals, including average rate movements and market trends.
                    </p>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">How it works:</h3>
                        <ol className="list-decimal pl-6 space-y-2 text-slate-400">
                            <li>We track market rate changes daily</li>
                            <li>When rates move significantly or cross alert thresholds</li>
                            <li>You receive an email (and optional SMS) notification</li>
                        </ol>
                    </div>
                    <p className="text-sm text-slate-500 italic">
                        Alerts are informational and designed to help you stay aware of market movement. They do not replace professional or financial advice. You can unsubscribe at any time.
                    </p>
                </section>
            </div>
        </main>
    );
}
