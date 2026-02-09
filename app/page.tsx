import { ImmersiveStory } from "@/components/landing/ImmersiveStory";
import { MarketIntel } from "@/components/landing/MarketIntel";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-emerald-500 selection:text-black antialiased">
      <ImmersiveStory />
      <MarketIntel />
      <Footer />
    </main>
  );
}
