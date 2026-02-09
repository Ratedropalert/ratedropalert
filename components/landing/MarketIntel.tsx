import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap } from "lucide-react";
import Link from "next/link";

export function MarketIntel() {
  const metrics = [
    {
      title: "Inflation Trend",
      val: "3.2%",
      color: "bg-emerald-500",
      bar: 30,
      trend: "-0.4% vs last month",
    },
    {
      title: "Fed Funds Rate",
      val: "5.25%",
      color: "bg-blue-500",
      bar: 80,
      trend: "Stable",
    },
    {
      title: "10Y Treasury",
      val: "4.10%",
      color: "bg-purple-500",
      bar: 50,
      trend: "+0.05% (Daily)",
    },
    {
      title: "Job Growth",
      val: "175K",
      color: "bg-orange-500",
      bar: 40,
      trend: "Slight Cooling",
    },
  ];

  return (
    <section className="relative py-12 sm:py-24 px-4 md:px-6 bg-black border-t border-white/5 z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">
              Market Intelligence
            </h2>
            <p className="text-slate-400 font-mono text-sm">
              DATA SOURCE: GLOBAL FINANCIAL NETWORK
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-mono text-2xl font-bold mt-4 md:mt-0">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />{" "}
            LIVE FEED
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((item, i) => (
            <Card
              key={i}
              className="bg-slate-900/40 border-white/5 hover:border-white/10 transition"
            >
              <CardContent className="p-6">
                <div className="text-slate-500 text-xs font-bold uppercase mb-2">
                  {item.title}
                </div>
                <div className="text-3xl font-black text-white mb-1">
                  {item.val}
                </div>
                <div className="text-emerald-400 text-xs flex items-center gap-1 mb-3">
                  <Activity className="w-3 h-3" /> {item.trend}
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.bar}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-slate-900/20 border-white/5">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white text-center">
              Why We Monitor These Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-emerald-400 font-bold text-sm mb-2">
                  INFLATION (CPI)
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  As inflation cools, Federal Reserve typically cuts interest
                  rates. We track CPI daily.
                </p>
              </div>
              <div>
                <h4 className="text-blue-400 font-bold text-sm mb-2">
                  10-YEAR TREASURY
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Mortgage rates correlate with 10-year Treasury yield. Small
                  dips equal massive savings.
                </p>
              </div>
              <div>
                <h4 className="text-purple-400 font-bold text-sm mb-2">
                  GLOBAL GEOPOLITICS
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Global stability affects bond markets. We analyze news
                  sentiment to time alerts perfectly.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-6 border-t border-white/5">
              <Button
                asChild
                variant="outline"
                className="mt-4 md:mt-0 bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 hover:text-yellow-400 gap-0"
              >
                <Link href="/signup" className="flex items-center">
                  <Zap className="mr-2 w-4 h-4" /> Set My Rate Alert
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
