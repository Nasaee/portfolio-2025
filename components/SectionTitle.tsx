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
}

function SectionTitle({
  sectionRef,
  text,
  containerClassName,
  textClassName,
}: SectionTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },

      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [sectionRef]);
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
