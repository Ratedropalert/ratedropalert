import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-xl py-4">
      <nav className="flex items-center justify-between max-w-6xl mx-auto w-full px-6">
        <div className="flex items-center gap-2 text-emerald-500 font-bold">
          <Zap /> RateDropAlert
        </div>
        <Button
          asChild
          variant="outline"
          className=" bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 hover:text-yellow-400 gap-0"
        >
          <Link href="/signup">
            <Zap className="mr-2 w-4 h-4" /> Get Notified
          </Link>
        </Button>
      </nav>
    </header>
  );
}
