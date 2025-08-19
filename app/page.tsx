import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/Navbar";
import LangFontProvider from "@/components/wrappers/LangFontProvider";

function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <LangFontProvider>
        <HeroSection />
      </LangFontProvider>
    </div>
  );
}
export default HomePage;
