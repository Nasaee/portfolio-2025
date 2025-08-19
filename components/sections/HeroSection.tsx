'use client';

import { useLangStore } from '@/store/useLangStore';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import Spline from '@splinetool/react-spline';

const textLang = {
  en: {
    headerGreetText: "Hi I'm ",
    name: 'Nasaee',
    subHeader:
      "I'm a full-stack developer with a strong passion for building modern, responsive, and user-friendly web applications. My expertise includes React, Node.js, and other cutting-edge web technologies. I enjoy creating clean, efficient solutions and I’m always learning to stay ahead of industry trends. Let’s collaborate and bring your ideas to life!",
  },
  th: {
    headerGreetText: "Hi I'm ",
    name: 'Nasaee',
    subHeader:
      'ฉันเป็นนักพัฒนาแบบฟูลสแตก (Full-Stack Developer) ที่มีความมุ่งมั่นอย่างแรงกล้าในการสร้างเว็บแอปพลิเคชันที่ทันสมัย ตอบสนองฉับไว และใช้งานง่าย ความเชี่ยวชาญของฉันครอบคลุม React, Node.js และเทคโนโลยีเว็บล้ำสมัยอื่นๆ ฉันชอบสร้างสรรค์โซลูชันที่สะอาดตาและมีประสิทธิภาพ และกำลังเรียนรู้อยู่เสมอเพื่อก้าวล้ำนำหน้าเทรนด์ในอุตสาหกรรม มาร่วมมือกันและนำไอเดียของคุณมาสร้างสรรค์ให้เป็นจริง!',
  },
};

function HeroSection() {
  const lang = useLangStore((state) => state.lang);
  const textData = textLang[lang];

  return (
    <section className='h-screen bg-gradient-to-b from-violet-900 to-black  lg:px-24 px-10 relative overflow-hidden'>
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
            className='text-4xl md:text-7xl lg:text-8xl font-bold z-10 mb-6 lg:tracking-wider'
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
                '',
                3000,
                'Fullstack Developer',
                4000,
                '',
              ]}
              wrapper='span'
              cursor={false} // close default cursor, custom manually on global css
              repeat={Infinity}
              speed={10}
              className='hidden lg:inline-block type'
            />
            <span className='lg:hidden'>{textData.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 40,
              damping: 25,
              delay: 1.8,
              duration: 1.5,
            }}
            className='text-md md:text-1xl lg:text-2xl text-purple-200 max-w-2xl'
          >
            {textData.subHeader}
          </motion.p>
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
