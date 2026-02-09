import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const GlassCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl",
      className,
    )}
    {...props}
  >
    {children}
    {/* Shine effect */}
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-white/10 to-transparent" />
  </div>
));
GlassCard.displayName = "GlassCard";
