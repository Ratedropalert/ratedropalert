import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-slate-950 border-t border-white/5 py-12 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Brand and Disclaimer */}
                    <div className="space-y-4">
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-red-500">Rate</span>
                            <span className="text-green-500">Drop</span>
                            <span className="text-white">Alert</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                            RateDropAlert is not a mortgage lender, broker, or financial institution.
                            Rates shown or referenced are estimates and market averages.
                            Actual mortgage rates vary by lender, credit profile, loan type, and market conditions.
                            Alerts are informational only and do not guarantee loan approval or specific pricing.
                        </p>
                    </div>

                    {/* Links and Contact */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Service</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
                            <p className="text-sm text-slate-400">
                                <a href="mailto:support@ratedropalert.com" className="hover:text-white transition-colors">
                                    support@ratedropalert.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} RateDropAlert. All rights reserved.
                    </p>
                    <p className="text-[10px] text-slate-600 text-center md:text-right uppercase tracking-widest">
                        Always consult a licensed mortgage professional before making financial decisions.
                    </p>
                </div>
            </div>
        </footer>
    );
}
