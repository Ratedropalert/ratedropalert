import Link from "next/link";
import { Zap, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-xl py-4">
      <nav className="flex items-center justify-between max-w-6xl mx-auto w-full px-6">
        <Link href="/" className="flex items-center justify-center gap-0">
          <ArrowUp className="rotate-45 text-red-500 font-extrabold w-5 h-5 sm:w-6 sm:h-6" />
          <span className="sm:text-2xl text-xl font-extrabold text-[#ef4444]">
            Rate
          </span>
          <span className="sm:text-2xl text-xl font-extrabold text-[#22c55e]">
            Drop
          </span>
          <span className="sm:text-2xl text-xl font-extrabold text-white">
            Alert
          </span>
        </Link>
        <Button
          asChild
          variant="outline"
          className=" bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 hover:text-yellow-400 gap-0"
        >
          <Link href="/signup">
            <Zap className="mr-2 w-4 h-4" /> Set My Rate Alert
          </Link>
        </Button>
      </nav>
    </header>
  );
}
