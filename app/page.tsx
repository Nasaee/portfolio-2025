import HeroSection from '@/components/sections/HeroSection';
import Navbar from '@/components/Navbar';
import LangFontProvider from '@/components/wrappers/LangFontProvider';
import SkillsSection from '@/components/sections/SkillsSection';

function HomePage() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <LangFontProvider>
        <HeroSection />
        <SkillsSection />
      </LangFontProvider>
    </div>
  );
}
export default HomePage;
