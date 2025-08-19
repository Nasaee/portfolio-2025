'use client';

import { useRef } from 'react';
import SectionTitle from '../SectionTitle';

function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id='skills'
      ref={sectionRef}
      className='h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50]'
    >
      <SectionTitle sectionRef={sectionRef} text='My Skills' />
    </section>
  );
}

export default SkillsSection;
