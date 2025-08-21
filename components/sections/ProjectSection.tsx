import { useLangStore } from '@/store/useLangStore';
import { useRef } from 'react';
import SectionTitle from '../SectionTitle';

const ProjectSection = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLLIElement>(null);

  return (
    <section
      ref={sectionRef}
      className='min-h-screen relative overflow-hidden pb-5 bg-gradient-to-b from-black to-[#9a74cf50] py-32'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'My Projects' : 'ผลงานของฉัน'}
      />
    </section>
  );
};

export default ProjectSection;
