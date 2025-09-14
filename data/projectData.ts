import {
  claimTracking,
  fitnessHubImg,
  futuregedgetsImg,
  portfolioImg,
  techHubImg,
} from '@/assets/projects';
import { nanoid } from 'nanoid';
import { StaticImageData } from 'next/image';

export interface Project {
  id: string;
  title: string;
  url?: string;
  sourceCode?: string;
  infoEng: string;
  infoTh: string;
  img: StaticImageData;
  technology: string[];
}

export const projects: Project[] = [
  {
    id: nanoid(),
    title: 'techHub',
    url: 'https://tecth-hub.netlify.app/',
    sourceCode: 'https://github.com/Nasaee/techhub-store',
    infoEng: 'tecthHub Store ecommerce website',
    infoTh: 'tecthHub ร้านค้าอุปกรณ์ IT ออนไลน์',
    img: techHubImg,
    technology: [
      'TypeScript',
      'JavaScript',
      'React.js',
      'Node.js',
      'Tailwind CSS',
    ],
  },
  {
    id: nanoid(),
    title: 'Fitness Hub',
    url: 'https://fitness-hub-application.netlify.app/',
    sourceCode: 'https://github.com/Nasaee/FitnessHub',
    infoEng: 'Fitness Hub online and offline fitness application',
    infoTh: 'Fitness Hub แอปพลิเคชันการออกกําลังกายออนไลน์และออฟไลน์',
    img: fitnessHubImg,
    technology: ['TypeScript', 'React.js', 'Styled-components'],
  },
  {
    id: nanoid(),
    title: 'Future Gadgets',
    url: 'https://future-gadgets.netlify.app/',
    sourceCode: 'https://github.com/Nasaee/future-gadgets',
    infoEng: 'Ecommerce website for IT products',
    infoTh: 'เว็บไซต์อุปกรณ์ IT ออนไลน์',
    img: futuregedgetsImg,
    technology: [
      'Javascript',
      'React.js',
      'Styled-components',
      'Stripe',
      'Airtable',
      'React Router Dom',
    ],
  },
  {
    id: nanoid(),
    title: 'Claim Tracking',
    url: 'https://cliam-tracking.onrender.com/',
    sourceCode: 'https://github.com/Nasaee/cliam-tracking',
    infoEng:
      'Application for tracking the status of medical device claims sent to the supplier for repair, This Applicaton make for daily use in my real job.',
    infoTh:
      'แอปพลิเคชันสำหรับติดตามสถานะการส่งเคลมอุปกรณ์การแพทย์ที่ส่งไปให้ผู้จำหน่ายซ่อม แอปพลิเคชันนี้ใช้งานจริงในงานประจําวันในบริษัทของฉัน',
    img: claimTracking,
    technology: [
      'TypeScript',
      'React.js',
      'Zod',
      'Redux',
      'React Hook Form',
      'Recharts',
      'Expressjs',
      'MongoDB',
      'JWT',
    ],
  },
  {
    id: nanoid(),
    title: 'Bookish',
    sourceCode: 'https://github.com/Nasaee/app_bookish',
    infoEng:
      'Bookish is a web application built to help manage a collection of Thai books that the developer has already purchased, with features for rating and recording details to avoid duplicate purchases and to easily track which books are already owned.',
    infoTh:
      'Bookish เป็นเว็บแอปพลิเคชันที่สร้างขึ้นเพื่อช่วยจัดการคลังหนังสือภาษาไทยที่ผู้พัฒนาได้ซื้อแล้ว พร้อมระบบการให้คะแนนและบันทึกข้อมูล เพื่อหลีกเลี่ยงการซื้อซ้ำ และช่วยให้สามารถติดตามว่ามีหนังสืออะไรอยู่ในครอบครองแล้วบ้าง',
    img: claimTracking,
    technology: ['Flutter', 'GO Router', 'SQFLITE'],
  },
];
