export default function MarketShiftSection() {
  return (
    <div className=" flex flex-col items-center justify-center panel-content pointer-events-auto">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-6 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none">
            Market
            <br />
            <span className="text-emerald-400">Shift</span>
          </h2>
          <div className="space-y-3 text-slate-400 font-mono text-sm md:text-base">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>STATUS</span>
              <span className="text-emerald-400">DROPPING ▼</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>CHANGE</span>
              <span className="text-white">-0.50%</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>VOLATILITY</span>
              <span className="text-orange-400">HIGH</span>
            </div>
          </div>
        </div>
        <div className="h-48 md:h-64 glass-card rounded-xl p-4 md:p-6 flex items-end justify-between gap-1 md:gap-2 border-l-4 border-emerald-500">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full bg-white/5 rounded-t-sm hover:bg-emerald-500/20 transition-colors"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
