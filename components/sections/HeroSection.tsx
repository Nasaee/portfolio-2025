'use client';

import { useLangStore } from '@/store/useLangStore';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import Spline from '@splinetool/react-spline';

const textLang = {
  en: {
    headerGreetText: "Hi I'm ",
    name: 'Nasaee',
    subHeader1:
      'a full-stack developer with a passion for turning ideas into real, interactive web experiences.',
    subHeader2:
      'I graduated from the Faculty of Arabic Arts in Malaysia, but my curiosity and creativity led me into the world of programming. What started as a hobby — writing code — quickly became a career path that I truly love.',
    subHeader3:
      'I enjoy learning new technologies and constantly expanding my toolkit. My journey began with JavaScript, TypeScript, React, HTML, and CSS, and has since grown into a full-stack skillset that covers everything from frontend frameworks to backend development, databases, and DevOps tools.',
  },
  th: {
    headerGreetText: 'สวัสดี ผมชื่อ ',
    name: 'นาซาอี',
    subHeader1:
      'ผมเป็น Full-Stack Developer ที่มีความหลงใหลในการสร้างเว็บไซต์และแอปพลิเคชันที่ทันสมัย ตอบสนองไว และใช้งานง่าย',
    subHeader2:
      'ผมจบการศึกษาจาก คณะอักษรศาสตร์อาหรับ ประเทศมาเลเซีย แต่ความสนใจในการเขียนโค้ดทำให้ผมหันมาศึกษาและพัฒนาทักษะด้านการเขียนโปรแกรมอย่างจริงจัง จากงานอดิเรกกลายมาเป็นเส้นทางอาชีพที่ผมรักและมุ่งมั่น',
    subHeader3:
      'ผมสนุกกับการเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ และเริ่มต้นจาก JavaScript, TypeScript, React, HTML และ CSS ก่อนจะขยายไปสู่การพัฒนาแบบเต็มสแต็ก ทั้ง Frontend, Backend, Database และ DevOps',
  },
};

function HeroSection() {
  const lang = useLangStore((state) => state.lang);
  const textData = textLang[lang];

  return (
    <section className='h-screen bg-gradient-to-b from-violet-700 to-black/80  lg:px-24 px-10 relative overflow-hidden'>
      <div className='container flex xl:flex-row flex-col-reverse items-center justify-between mx-auto h-full'>
        {/* Left Section */}
        <div className='z-40 xl:mb-0 mb-[20%]'>
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 40,
              damping: 25,
              delay: 1.3,
              duration: 1.5,
            }}
            className='text-4xl md:text-7xl lg:text-8xl font-bold z-10 mb-8 md:mb-10 lg:mb-12 lg:tracking-wider'
          >
            {textData.headerGreetText}
            {/* typing text */}
            <TypeAnimation
              key={lang}
              sequence={[
                '',
                1000,
                textData.name,
                2000,
                // '',
                // 3000,
                // 'Fullstack Developer',
                // 4000,
                // '',
              ]}
              wrapper='span'
              cursor={false} // close default cursor, custom manually on global css
              repeat={Infinity}
              speed={10}
              className='hidden lg:inline-block type'
            />
            <span className='lg:hidden'>{textData.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 40,
              damping: 25,
              delay: 1.8,
              duration: 1.5,
            }}
            className='flex flex-col space-y-6 text-md md:text-1xl lg:text-2xl text-purple-100 max-w-3xl leading-relaxed'
          >
            <p>{textData.subHeader1}</p>
            <p>{textData.subHeader2}</p>
            <p>{textData.subHeader3}</p>
          </motion.div>
        </div>
        {/* Right Section */}
        <Spline
          className='absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0'
          scene='https://prod.spline.design/xjQFy-JzKcwAc59B/scene.splinecode'
        />
      </div>
    </section>
  );
}
export default HeroSection;
