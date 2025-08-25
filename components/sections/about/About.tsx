'use client';

import { useLangStore } from '@/store/useLangStore';
import { useLayoutEffect, useRef } from 'react';
import SectionTitle from '../../SectionTitle';
import Image from 'next/image';
import { personalInfo } from '@/data/personalInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResumeButton from './ResumeButton';
import TranscriptButton from './TranscriptButton';
import CertificateButton from './CertificateButton';

const About = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // เปลี่ยน useEffect → useLayoutEffect เพื่อกันกระพริบก่อน animate
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ผูกทุกอย่างไว้ใน context ที่ยึดกับ sectionRef
    const ctx = gsap.context(() => {
      if (!infoRef.current || !sectionRef.current) return;

      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    // cleanup: ยกเลิกทุก tween/ScrollTrigger ที่สร้างใน context นี้
    return () => ctx.revert();
  }, []);

  const data = personalInfo[lang];

  return (
    <div
      id='about'
      ref={sectionRef}
      className='min-h-screen overflow-hidden bg-gradient-to-b from-black to-black pb-36 pt-8'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'About Me' : 'เกี่ยวกับฉัน'}
        textClassName='text-gray-100'
      />

      <div className='mt-8 flex flex-col items-center gap-5 px-8 lg:gap-12 xl:flex-row xl:justify-center xl:gap-16'>
        <Image
          src='/profile.png'
          alt='profile'
          width={500}
          height={500}
          priority
          className='up-down size-[20rem] md:size-[32rem]'
        />

        {/* Contents */}
        <div ref={infoRef}>
          <h3 className='max-w-4xl bg-gradient-to-br from-white to-gray-200 bg-clip-text text-3xl leading-relaxed tracking-wide text-transparent'>
            {data.intro}
          </h3>

          <div className='mt-12 flex flex-col gap-8'>
            <LabelValue
              label={lang === 'en' ? 'Name' : 'ชื่อ'}
              value={`${data.firstName} ${data.lastName}`}
            />
            <LabelValue
              label={lang === 'en' ? 'Age' : 'อายุ'}
              value={data.age.toString()}
            />
            <LabelValue
              label={lang === 'en' ? 'Graduate From' : 'สําเร็จการศึกษาจาก'}
              value={data.graduateFrom}
            />
            <LabelValue
              label={lang === 'en' ? 'Program' : 'คณะ'}
              value={data.programe}
            />
            <LabelValue
              label={lang === 'en' ? 'Address' : 'ที่อยู่'}
              value={data.address}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='container mx-auto mt-36 flex flex-col items-center justify-center gap-5 px-4 lg:flex-row lg:justify-end lg:gap-8'>
        <ResumeButton />
        <TranscriptButton />
        <CertificateButton />
      </div>
    </div>
  );
};

export default About;

const LabelValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex gap-4 text-2xl text-gray-100 lg:text-3xl'>
      <span className='text-nowrap font-semibold tracking-wide'>{label}: </span>
      <span>{value}</span>
    </div>
  );
};
