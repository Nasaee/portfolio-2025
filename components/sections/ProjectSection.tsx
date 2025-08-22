import { useLangStore } from '@/store/useLangStore';
import { useRef } from 'react';
import SectionTitle from '../SectionTitle';
import { projects } from '@/data/projectData';
import ProjectCard from '../ProjectCard';

const ProjectSection = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLLIElement>(null);

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='min-h-screen relative overflow-hidden pb-5 bg-gradient-to-b from-black to-violet-400 py-32'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'My Projects' : 'ผลงานของฉัน'}
      />

      <div className='container mx-auto px-4 pb-8 mt-16'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-8'>
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
