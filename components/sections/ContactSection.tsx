'use client';

import { useLangStore } from '@/store/useLangStore';
import { useLayoutEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import Image from 'next/image';
import { contacts } from '@/data/contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lang = useLangStore((s) => s.lang);
  const { email, phone, facebook, linkIn } = contacts;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const items = gsap.utils.toArray<HTMLElement>(
        '[data-animate="contact-item"]'
      );
      if (!items.length || prefersReduced) return;

      // initial state
      gsap.set(items, { x: 60, opacity: 0 });

      // desktop
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          ScrollTrigger.batch(items, {
            start: 'top 80%', // อิงกับแต่ละ item
            onEnter: (batch) =>
              gsap.to(batch, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.12,
              }),
            onLeaveBack: (batch) =>
              gsap.to(batch, {
                x: 60,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.08,
              }),
            // ห้ามใส่ trigger ที่นี่
            // trigger: sectionRef.current,  <-- ลบ
            // toggleActions ก็ไม่ใช้ใน batch
          });
        },
        '(max-width: 1023.98px)': () => {
          gsap.set(items, { x: 40, opacity: 0 });
          ScrollTrigger.batch(items, {
            start: 'top 85%',
            onEnter: (batch) =>
              gsap.to(batch, {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.1,
              }),
            onLeaveBack: (batch) =>
              gsap.to(batch, {
                x: 40,
                opacity: 0,
                duration: 0.45,
                ease: 'power2.out',
                stagger: 0.06,
              }),
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-violet-800 pt-14 pb-36'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'Contact Me' : 'ติดต่อฉัน'}
      />

      <div className='container mx-auto mt-16 flex'>
        <Image
          src='/contact.svg'
          alt='contact'
          width={500}
          height={500}
          className='hidden w-1/2 lg:block'
          priority
        />

        <div className='flex flex-col gap-14 px-5'>
          <a
            data-animate='contact-item'
            href={`mailto:${email.address}`}
            className='flex items-center gap-5 text-2xl tracking-widest transition-all duration-300 hover:text-[#fa5252] lg:text-3xl text-shadow'
          >
            {email.icon}
            <span>{email.address}</span>
          </a>
          <a
            data-animate='contact-item'
            href={`tel:${phone.phoneNo}`}
            className='flex items-center gap-5 text-2xl tracking-widest transition-all duration-300 hover:text-[#51cf66] lg:text-3xl text-shadow'
          >
            {phone.icon}
            <span>{phone.phoneNo}</span>
          </a>
          <a
            data-animate='contact-item'
            href={facebook.url}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-5 text-2xl tracking-widest transition-all duration-300 hover:text-[#364fc7] lg:text-3xl text-shadow'
          >
            {facebook.icon}
            <span>{facebook.userName}</span>
          </a>
          <a
            data-animate='contact-item'
            href={linkIn.url}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-5 text-2xl tracking-widest transition-all duration-300 hover:text-[#1864ab] lg:text-3xl text-shadow'
          >
            {linkIn.icon}
            <span>{linkIn.userName}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
