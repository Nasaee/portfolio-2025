'use client';

import { RefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils/utils';

interface SectionTitleProps {
  sectionRef: RefObject<HTMLLIElement | HTMLDivElement | null>;
  text: string;
  containerClassName?: string;
  textClassName?: string;
  // ถ้าอยากให้เล่นครั้งเดียว ใส่ true (ค่าเริ่มต้น false)
  once?: boolean;
}

function SectionTitle({
  sectionRef,
  text,
  containerClassName,
  textClassName,
  once = false,
}: SectionTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // จับค่าปัจจุบันของ ref ไว้ในตัวแปรโลคัล (แก้ ESLint warning)
    const titleEl = titleRef.current;
    const triggerEl = sectionRef.current;

    if (!titleEl || !triggerEl) return;

    const tween = gsap.fromTo(
      titleEl,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 70%',
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
          once, // ถ้า true จะทำลาย trigger ให้อัตโนมัติหลังเล่น
        },
      }
    );

    return () => {
      // ใช้ตัวแปรโลคัล ไม่อ้างอิง sectionRef.current ใน cleanup
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
    // พอ: เราผูกกับ element เดียวผ่าน sectionRef เท่านั้น
  }, [sectionRef, once]);

  return (
    <div
      className={cn(
        'container mx-auto px-4 h-full flex flex-col items-center justify-center',
        containerClassName
      )}
    >
      <h1
        ref={titleRef}
        className={cn(
          'text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0 tracking-wider pt-2',
          textClassName
        )}
      >
        {text}
      </h1>
    </div>
  );
}

export default SectionTitle;
