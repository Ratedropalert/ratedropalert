import { AlertTriangle, ArrowDown } from "lucide-react";
import React from "react";
import { GlassCard } from "../shared/glass-card";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center panel-content pointer-events-auto px-4 overflow-hidden min-h-screen">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-400 text-xs font-bold tracking-widest uppercase">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Live Market Status: Overpaying
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
            Stuck at <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-red-400 to-red-900 drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]">
              6.25%
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto lg:mx-0">
            Market dropped to{" "}
            <span className="text-emerald-400 font-bold">5.75%</span>. Your rate
            is locked at a premium.
          </p>
          <GlassCard className="border-l-4 border-red-500 p-4 flex items-center justify-between max-w-sm mx-auto lg:mx-0">
            <div>
              <div className="text-xs text-slate-500 font-mono uppercase">
                Annual Loss
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                $3,576
              </div>
            </div>
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shrink-0">
              <AlertTriangle />
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-7 relative h-[300px] lg:h-[400px] order-1 lg:order-2">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)] rounded-3xl" />

          {/* Mini Stats */}
          <GlassCard className="absolute top-2 right-2 glass-card p-3 rounded-xl w-40 z-20 ">
            <div className="text-[10px] text-slate-500 font-mono">
              Inflation (CPI)
            </div>
            <div className="text-base font-bold text-white">
              3.2% <span className="text-red-400 text-[10px]">▲</span>
            </div>
          </GlassCard>
          <GlassCard className="absolute bottom-16 left-2 glass-card p-3 rounded-xl w-40 z-20">
            <div className="text-[10px] text-slate-500 font-mono">Fed Rate</div>
            <div className="text-base font-bold text-white">
              5.25% <span className="text-emerald-400 text-[10px]">▼</span>
            </div>
          </GlassCard>

          {/* Main Graph */}
          <GlassCard className="absolute inset-4 rounded-2xl p-4 z-10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Trend Analysis
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-1 relative px-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full h-px bg-white/5"></div>
                <div className="w-full h-px bg-white/5"></div>
                <div className="w-full h-px bg-white/5"></div>
              </div>
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t-sm relative ${i < 6 ? "bg-red-500/20" : "bg-emerald-500/20"}`}
                    style={{
                      height: i < 6 ? "85%" : 85 - (i - 6) * 7 + "%",
                    }}
                  ></div>
                ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 w-full bg-black/90 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden z-20">
        <div className="ticker-wrap">
          <div className="ticker-move text-[10px] md:text-xs font-mono text-slate-500">
            <span className="mx-4">• 10Y TREASURY: 4.10% ▼</span>
            <span className="mx-4">• 30Y FIXED AVG: 6.15% ▼</span>
            <span className="mx-4">• CPI UPDATE: +0.1%</span>
            <span className="mx-4">• VOLATILITY: HIGH</span>
            <span className="mx-4">• NEXT FED: DEC 12</span>
            <span className="mx-4">• USERS SAVED: $4.2M</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative animate-bounce">
          <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping"></div>
          <ArrowDown />
        </div>
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
          Scroll
        </span>
      </div>
    </section>
  );
}
