import HeroSection from "@/components/layout/HeroSection";
import FeatureGrid from "@/components/features/FeatureGrid";
import IntegrationsSection from "@/components/sections/integrationssection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <HeroSection />
      <FeatureGrid />
      <IntegrationsSection />
    </main>
  );
}
