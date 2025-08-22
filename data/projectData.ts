import {
  claimTracking,
  fitnessHubImg,
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
    title: 'Fitness Hub',
    url: 'https://fitness-hub-application.netlify.app/',
    sourceCode: 'https://github.com/Nasaee/FitnessHub',
    infoEng: 'Fitness Hub online and offline fitness application',
    infoTh: 'Fitness Hub แอปพลิเคชันการออกกําลังกายออนไลน์และออฟไลน์',
    img: fitnessHubImg,
    technology: ['TypeScript', 'React.js', 'Styled-components'],
  },
];
