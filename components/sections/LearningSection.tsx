'use client';

import { useLangStore } from '@/store/useLangStore';
import { useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import { learning } from '@/data/skillsData';
import Tilt from '../TiltClient';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LearningSection = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLLIElement>(null);
  const skillsRef = useRef<HTMLLIElement[]>([]);

  const addToSkills = (el: HTMLLIElement | null) => {
    if (el && !skillsRef.current.includes(el)) {
      skillsRef.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // เคลียร์ state เริ่มต้นของทุกไอเท็ม
    gsap.set(skillsRef.current, { y: 50, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(skillsRef.current, {
        start: 'top 85%',
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
            duration: 0.5,
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
            duration: 0.3,
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
      ref={sectionRef}
      className='relative overflow-hidden pb-5 bg-gradient-to-b from-[#9a74cf50] to-black py-32'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'Learning' : 'กำลังเรียนรู้'}
      />

      <div className='container mx-auto mt-16'>
        <ul className='grid grid-cols-3 lg:grid-cols-4 place-items-center gap-2'>
          {learning.map((skill) => {
            const { skillIcon, id, skillName } = skill;
            return (
              <li
                key={id}
                ref={addToSkills}
                className='mt-10 p-4 transition-all duration-300 hover:scale-[1.2]'
              >
                <Tilt>
                  <a
                    href={skill.link}
                    target='_blank'
                    rel='noreferrer'
                    className='flex flex-col items-center gap-4'
                  >
                    <Image src={skillIcon} alt={skill.skillName} width={80} />
                    <p className='text-lg tracking-wider'>{skillName}</p>
                  </a>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default LearningSection;
