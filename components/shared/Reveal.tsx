"use client";

import { cn } from "@/lib/utils";

export function Reveal({
  visible,
  children,
  delay = 0,
}: {
  visible: boolean;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-900 ease-out will-change-transform",
        visible
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : "opacity-0 translate-y-20 scale-[0.96] blur-md",
      )}
    >
      {children}
    </div>
  );
}
