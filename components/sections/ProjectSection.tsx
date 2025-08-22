import { useLangStore } from '@/store/useLangStore';
import { useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import { projects } from '@/data/projectData';
import ProjectCard from '../ProjectCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectSection = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLLIElement>(null);
  const projectRef = useRef<HTMLDivElement[]>([]);

  const addToProjectRef = (el: HTMLDivElement | null) => {
    if (el && !projectRef.current.includes(el)) {
      projectRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // เคลียร์ state เริ่มต้นของทุกไอเท็ม
    gsap.set(projectRef.current, { y: 50, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(projectRef.current, {
        start: 'top 80%',
        // เข้า viewport จากด้านล่าง
        onEnter: (els) => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.06, //
            overwrite: 'auto',
          });
        },
        // กลับเข้า viewport จากด้านบน (เวลาเลื่อนย้อนขึ้น)
        onEnterBack: (els) => {
          gsap.to(els, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.05,
            overwrite: 'auto',
          });
        },
        // เลื่อนไปด้านบนจนพ้น viewport (ย้อนกลับ) → รีเซ็ตให้พร้อมเล่นใหม่
        onLeaveBack: (els) => {
          gsap.to(els, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            overwrite: 'auto',
          });
        },
        // ถ้าอยากให้เลื่อนลงจนพ้นจอแล้วรีเซ็ตด้วย ก็เพิ่ม onLeave ตรงนี้ได้
        onLeave: (els) => gsap.set(els, { y: 50, opacity: 0 }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='min-h-screen relative overflow-hidden pb-5 bg-gradient-to-b from-[#9a74cf50] to-violet-400 py-32'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'My Projects' : 'ผลงานของฉัน'}
      />

      <div className='container mx-auto px-4 pb-8 mt-16'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] gap-8'>
          {projects.map((project) => (
            <div key={project.id} ref={addToProjectRef}>
              <ProjectCard project={project} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
