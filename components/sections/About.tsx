import { Lang, useLangStore } from '@/store/useLangStore';
import { ReactNode, useEffect, useRef } from 'react';
import SectionTitle from '../SectionTitle';
import Image from 'next/image';
import { personalInfo } from '@/data/personalInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BiSolidFilePdf } from 'react-icons/bi';
import { BsArrowRightCircleFill } from 'react-icons/bs';
const About = () => {
  const lang = useLangStore((s) => s.lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      infoRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
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

  const data = personalInfo[lang];

  return (
    <div
      id='about'
      ref={sectionRef}
      className='min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50] pb-36'
    >
      <SectionTitle
        sectionRef={sectionRef}
        text={lang === 'en' ? 'About Me' : 'เกี่ยวกับฉัน'}
        textClassName='text-gray-100'
      />

      <div className='flex flex-col items-center xl:flex-row xl:justify-center gap-5 lg:gap-12 xl:gap-16 mt-8 px-8'>
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
          <h3 className='text-3xl leading-relaxed tracking-wide max-w-4xl bg-gradient-to-r from-violet-600 via-[#ae67fa] to-[#f49867] bg-clip-text text-transparent'>
            {data.intro}
          </h3>

          <div className='flex flex-col gap-8 mt-12'>
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

      {/* button  */}
      <div className='container flex justify-center items-center flex-col lg:flex-row lg:justify-end gap-5 lg:gap-8 mt-36 px-4'>
        <CardButton
          text='Resume'
          icon={<BiSolidFilePdf size={30} className='text-red-500' />}
          onClick={() => {}}
        />
        <CardButton
          text={lang === 'en' ? 'Transcript' : 'ใบประกาศนียบัตร'}
          icon={<BiSolidFilePdf size={30} className='text-red-500' />}
          onClick={() => {}}
        />

        <CardButton
          text={lang === 'en' ? 'Certificate' : 'ใบรับรอง'}
          icon={<BsArrowRightCircleFill size={30} className='text-gray-200' />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default About;

const LabelValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 text-2xl lg:text-3xl text-gray-100'>
      <span className='font-semibold text-nowrap tracking-wide'>{label}: </span>
      <span>{value}</span>
    </div>
  );
};

const CardButton = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button className='flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-br from-violet-700 to-violet-900 rounded-sm cursor-pointer w-full lg:w-[250px] tracking-wider hover:scale-110 transition-all duration-300'>
      {icon}
      <p className='text-lg'>{text}</p>
    </button>
  );
};
