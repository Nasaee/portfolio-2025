'use client';

import HeroSection from '@/components/sections/HeroSection';
import Navbar from '@/components/Navbar';
import SkillsSection from '@/components/sections/SkillsSection';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectSection from '@/components/sections/ProjectSection';
import Footer from '@/components/Footer';
import About from '@/components/sections/About';
import LangFontProvider from '@/components/wrappers/LangFontProvider';

function HomePage() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger when the page is fully Loaded
    ScrollTrigger.refresh();

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className='flex flex-col'>
      <Navbar />
      <LangFontProvider>
        <HeroSection />
        <About />
        <SkillsSection />
        <ProjectSection />
      </LangFontProvider>
      <Footer />
    </div>
  );
}
export default HomePage;
