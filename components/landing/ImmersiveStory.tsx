"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  AlertTriangle,
  Zap,
  Activity,
  Cpu,
  Shield,
  Check,
  Star,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImmersiveStory() {
  const [isDesktop, setIsDesktop] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const heartRateRef = useRef<HTMLSpanElement>(null);
  const lossCounterRef = useRef<HTMLDivElement>(null);
  const graphBarsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isDesktop) return; // Only run on mobile

    const ctx = gsap.context(() => {
      // Select all panels except Panel 1
      gsap.utils.toArray<HTMLElement>(".panel-content").forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, wrapperRef);

    if (lossCounterRef.current) {
      gsap.fromTo(
        lossCounterRef.current,
        { textContent: 4000 },
        {
          textContent: 12000,
          duration: 3,
          snap: { textContent: 1 },
          repeat: -1,
          ease: "none",
          onUpdate: function () {
            if (lossCounterRef.current) {
              lossCounterRef.current.innerHTML =
                "$" +
                Math.ceil(
                  gsap.getProperty(this.targets()[0], "textContent") as number,
                ).toLocaleString();
            }
          },
        },
      );
    }

    return () => {
      ctx.revert(); // cleanup
    };
  }, [isDesktop]);

  useEffect(() => {
    let ctx: gsap.Context;
    let tl: gsap.core.Timeline;

    const initAnimation = () => {
      if (!isDesktop) return;

      ctx = gsap.context(() => {
        // Reset all panels
        gsap.set([p2Ref.current, p3Ref.current, p4Ref.current], {
          opacity: 0,
          scale: 1.05,
          filter: "blur(10px)",
          zIndex: 0,
        });
        gsap.set(p1Ref.current, { zIndex: 10 });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        // Panel 1 Animation
        if (heartRateRef.current) {
          gsap.to(heartRateRef.current, {
            scale: 1.05,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
          });
        }

        if (lossCounterRef.current) {
          gsap.fromTo(
            lossCounterRef.current,
            { textContent: 4000 },
            {
              textContent: 12000,
              duration: 3,
              snap: { textContent: 1 },
              repeat: -1,
              ease: "none",
              onUpdate: function () {
                if (lossCounterRef.current) {
                  lossCounterRef.current.innerHTML =
                    "$" +
                    Math.ceil(
                      gsap.getProperty(
                        this.targets()[0],
                        "textContent",
                      ) as number,
                    ).toLocaleString();
                }
              },
            },
          );
        }

        tl.to(p1Ref.current, {
          opacity: 0,
          scale: 0.9,
          filter: "blur(15px)",
          duration: 1.5,
          zIndex: 0,
        })
          .to(
            p2Ref.current,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5,
              zIndex: 10,
            },
            "<",
          )
          .fromTo(
            graphBarsRef.current,
            { height: "10%" },
            {
              height: (i) =>
                [
                  "45%",
                  "70%",
                  "35%",
                  "90%",
                  "55%",
                  "80%",
                  "40%",
                  "60%",
                  "50%",
                  "75%",
                ][i],
              stagger: 0.05,
              duration: 1,
            },
            "<0.4",
          )
          .to(p2Ref.current, {
            opacity: 0,
            scale: 0.9,
            filter: "blur(15px)",
            duration: 1.5,
            zIndex: 0,
          })
          .to(
            p3Ref.current,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5,
              zIndex: 10,
            },
            "<",
          )
          .to(p3Ref.current, {
            opacity: 0,
            scale: 0.9,
            filter: "blur(15px)",
            duration: 1.5,
            zIndex: 0,
          })
          .to(
            p4Ref.current,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.5,
              zIndex: 10,
            },
            "<",
          );
      }, wrapperRef);
    };

    // Initialize first time
    initAnimation();

    const handleResize = () => {
      // Kill previous timeline & context
      if (tl) {
        tl.kill();
      }
      if (ctx) {
        ctx.revert();
      }

      // Re-initialize animation if desktop
      if (isDesktop) {
        initAnimation();
      } else {
        // If mobile, reset panels to normal
        gsap.set([p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current], {
          clearProps: "all",
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tl) tl.kill();
      if (ctx) ctx.revert();
    };
  }, [isDesktop]);

  return (
    <div ref={wrapperRef} className="relative min-h-dvh overflow-hidden">
      {/* Content Container */}
      <div className="sm:fixed sm:inset-0 flex flex-col items-center justify-center z-10 pointer-events-none gap-0 sm:gap-0">
        <div
          ref={p1Ref}
          className="sm:absolute sm:inset-0 panel-content pointer-events-auto pt-8 sm:pt-16 opacity-100 transition-opacity duration-500 ease-out max-w-6xl mx-auto w-full px-6"
        >
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="text-yellow-400 text-2xl sm:text-4xl lg:text-5xl font-black mb-2 text-center leading-tight">
              We&apos;ll let you know when
              <br className="sm:hidden" />
              refinancing actually makes sense
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            <div className="sm:col-span-5 space-y-3 text-center sm:text-left">
              <Badge
                variant="destructive"
                className="mb-4 bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                Live Market Status: Overpaying
              </Badge>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none">
                Stuck at
                <br />
                <span
                  ref={heartRateRef}
                  className="text-transparent bg-clip-text bg-linear-to-b from-red-400 to-red-900 drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]"
                >
                  6.25
                  <span className="text-5xl lg:text-6xl text-red-500">%</span>
                </span>
              </h1>

              <p className="text-slate-400 text-lg">
                Market dropped to{" "}
                <span className="text-emerald-400 font-bold">5.75%</span>. Your
                rate is locked at a premium.
              </p>

              <Card className="border-l-4 border-l-red-500 bg-slate-900/40 backdrop-blur-xl border-red-500/20 max-w-sm mx-auto lg:mx-0 py-4">
                <CardContent className=" flex items-center justify-between px-4">
                  <div>
                    <div className="text-xs text-slate-500 font-mono uppercase">
                      Annual Loss
                    </div>
                    <div
                      ref={lossCounterRef}
                      className="text-3xl font-black text-white tracking-tight"
                    >
                      $2,655
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Graph */}
            <div className="sm:col-span-7 relative h-[400px] sm:pl-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] rounded-3xl mask-image-gradient" />
              <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md border border-white/5 p-3 rounded-xl w-40 z-20">
                <div className="text-[10px] text-slate-500 font-mono">
                  Inflation (CPI)
                </div>
                <div className="text-base font-bold text-white">
                  3.2% <span className="text-red-400 text-xs">▲</span>
                </div>
              </div>
              <div className="absolute bottom-20 left-4 bg-slate-900/60 backdrop-blur-md border border-white/5 p-3 rounded-xl w-40 z-20">
                <div className="text-[10px] text-slate-500 font-mono">
                  Fed Rate
                </div>
                <div className="text-base font-bold text-white">
                  5.25% <span className="text-emerald-400 text-xs">▼</span>
                </div>
              </div>
              <Card className="absolute inset-4 bg-slate-900/20 backdrop-blur-sm border border-white/5 flex flex-col justify-end">
                <CardContent className="flex justify-between items-end h-full gap-1.5">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => {
                      const isRed = i < 6;
                      return (
                        <div
                          key={i}
                          className={`w-full rounded-t-sm transition-all duration-500 ${isRed ? "bg-red-500/80" : "bg-emerald-500/80"}`}
                          style={{
                            height: isRed
                              ? `${85 - i * 5}%`
                              : `${55 - (i - 6) * 5}%`,
                          }}
                        />
                      );
                    })}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="hidden sm:absolute sm:bottom-20 left-1/2 -translate-x-1/2 sm:flex flex-col items-center gap-2 z-30 animate-bounce">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping" />
              <ArrowDown className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
              Scroll
            </span>
          </div>
        </div>

        <div
          ref={p2Ref}
          className="sm:absolute sm:inset-0 flex flex-col justify-center panel-content pointer-events-auto py-8 sm:py-0 sm:opacity-0 w-full max-w-6xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div className="w-full space-y-6 text-center sm:text-left col-span-1">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none">
                Market
                <br />
                <span className="text-emerald-400">Shift</span>
              </h1>
              <div className="space-y-4 text-slate-400 font-mono text-lg">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>STATUS</span>
                  <span className="text-emerald-400">DROPPING ▼</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>CHANGE</span>
                  <span className="text-white">-0.75%</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>VOLATILITY</span>
                  <span className="text-orange-400">HIGH</span>
                </div>
              </div>
              <div className="hidden md:block mt-4 p-4 border-l-2 border-emerald-500 bg-emerald-500/10">
                <p className="text-white font-medium">
                  We watch the rates so you don&apos;t miss the opportunity.
                  Timing matters. We help you get it right.
                </p>
              </div>
            </div>

            {/* IMPROVED GRAPH CARD */}
            <Card className="h-80 col-span-1 w-full bg-slate-900/40 backdrop-blur-xl border border-white/5 border-l-4 border-l-emerald-500 relative overflow-hidden flex flex-col">
              {/* Background Grid Lines for Financial Context */}
              <div className="absolute inset-0 flex flex-col justify-between p-0 pointer-events-none z-0 opacity-20">
                <div className="w-full h-px bg-white"></div>
                <div className="w-full h-px bg-white"></div>
                <div className="w-full h-px bg-white"></div>
                <div className="w-full h-px bg-white"></div>
              </div>

              {/* Bars Container */}
              <div className="relative z-10 flex items-end justify-between h-full px-4 pb-4 pt-8 gap-1 sm:gap-2 w-full">
                {Array(12)
                  .fill(0)
                  .map((_, i) => {
                    const isRed = i < 6;

                    // Set static height for small screens
                    const staticHeights = [
                      "45%",
                      "70%",
                      "35%",
                      "90%",
                      "55%",
                      "80%",
                      "40%",
                      "60%",
                      "50%",
                      "75%",
                      "10%",
                      "10%",
                    ];
                    const height = isDesktop ? "10%" : staticHeights[i];

                    return (
                      <div
                        key={i}
                        ref={(el) => {
                          if (el && isDesktop) graphBarsRef.current[i] = el; // only animate desktop bars
                        }}
                        className={`w-full rounded-t-sm ${isRed
                          ? "bg-linear-to-t from-red-900/80 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                          : "bg-linear-to-t from-emerald-900/80 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                          }`}
                        style={{ height }}
                      />
                    );
                  })}
              </div>
            </Card>
          </div>
        </div>

        <div
          ref={p3Ref}
          className="sm:absolute sm:inset-0 flex flex-col items-center justify-center panel-content pointer-events-auto pt-8 sm:pt-16 sm:opacity-0"
        >
          <Card className="w-full max-w-[320px] px-6 bg-slate-900/80 backdrop-blur-2xl border border-emerald-500/30 rounded-[2.5rem] p-2 shadow-[0_0_60px_rgba(16,185,129,0.2)]">
            <CardContent className="bg-black rounded-[2rem] p-6 h-[520px] flex flex-col relative overflow-hidden">
              {/* Notch/Status Bar simulation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20" />

              <div className="flex items-center gap-4 mb-6 pt-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-white">RateDrop</h3>
                  <Badge className="text-[10px] bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20">
                    ALERT • NOW
                  </Badge>
                </div>
              </div>

              <Card className="bg-slate-900 border-emerald-500/20 grow flex flex-col justify-center">
                <CardContent className="p-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-slate-400">TARGET RATE</span>
                    <span className="text-5xl font-black text-white">
                      5.75%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mb-4">
                    <div className="bg-emerald-500 h-full w-[90%]" />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500 mb-6">
                    <span>OLD: 6.25%</span>
                    <span>NEW: 5.75%</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-slate-300 font-bold text-sm">
                      EST. SAVINGS
                    </span>
                    <span className="text-emerald-400 font-black text-2xl">
                      $578/mo
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full mt-6 bg-white text-black hover:bg-slate-200 h-12 text-base font-bold"
                asChild
              >
                <Link href="/signup">Set My Rate Alert</Link>
              </Button>

              <div className="mt-auto pt-4 text-center">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wide">
                  Be first to know when rates hit your target.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PANEL 4: Control Center */}
        <div
          ref={p4Ref}
          className="sm:absolute sm:inset-0 flex flex-col justify-center panel-content pointer-events-auto overflow-y-auto py-12 sm:opacity-0 w-full max-w-6xl mx-auto px-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                Your Control Center
              </h2>
              <p className="text-slate-500 font-mono text-sm">
                STATUS: OPTIMIZED
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 md:mt-0 bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 hover:text-yellow-400"
            >
              <Star className="w-4 h-4 mr-2 fill-current" /> Set My Rate Alert
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {/* Projection Card */}
            <Card className="bg-slate-900/40 backdrop-blur-md border-t-2 border-t-emerald-500/50 min-h-80">
              <CardContent className=" flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <Activity className="text-emerald-400" />
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    PROJECTION
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Monthly Payment</span>
                    <span className="text-white font-mono">$2,102</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-slate-400">Previous</span>
                    <span className="text-slate-500 font-mono line-through">
                      $2,400
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 p-3 rounded-lg">
                    <div className="text-xs text-emerald-400 uppercase font-bold mb-1">
                      Savings / Year
                    </div>
                    <div className="text-2xl font-black text-white">$9,758</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Data Card */}
            <div className="relative group">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full text-center opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity">
                <p className="text-yellow-400 text-[10px] font-bold">
                  Smart homeowners don&apos;t watch rates — they get alerts
                </p>
              </div>
              <Card className="bg-slate-900/40 backdrop-blur-md border-t-2 border-t-purple-500/50 p-6 min-h-80 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <Cpu className="text-purple-400" />
                  <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                    LIVE DATA
                  </Badge>
                </div>
                <div className="space-y-4 grow">
                  {[
                    {
                      label: "Fed Rate",
                      width: "80%",
                      color: "bg-emerald-500",
                    },
                    { label: "10Y Yield", width: "60%", color: "bg-blue-500" },
                    { label: "CPI", width: "45%", color: "bg-purple-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-white">
                        <span>{item.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-white text-black hover:bg-slate-200 h-10 text-base font-bold">
                  <Link href="/signup">Set My Rate Alert</Link>
                </Button>
              </Card>
            </div>

            {/* Auto Notify Card */}
            <Card className="bg-slate-900/40 backdrop-blur-md border-t-2 border-t-blue-500/50 p-6 min-h-80">
              <div className="flex justify-between items-start mb-6">
                <Shield className="text-blue-400" />
                <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-1">Auto-Notify</h3>
                  <p className="text-xs text-slate-400">
                    Receive alerts immediately when target is hit.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold mb-2">Zero Commitment</h3>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 bg-emerald-500/20 rounded-full p-0.5" />
                    <span className="text-sm text-slate-300">
                      Free alerts - unsubscribe anytime.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 bg-emerald-500/20 rounded-full p-0.5" />
                    <span className="text-sm text-slate-300">
                      We watch rates and notify you at your target.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 bg-emerald-500/20 rounded-full p-0.5" />
                    <span className="text-sm text-slate-300">
                      Explore offers from trusted lenders.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 bg-emerald-500/20 rounded-full p-0.5" />
                    <span className="text-sm text-slate-300">
                      You choose if and when lenders reach out.
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
