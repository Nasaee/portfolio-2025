import {
  htmlCssCertificateImg,
  javaScriptCertificateImg,
  reactCertificateImg,
  cssCertificateImg,
} from '@/assets/certificate';
import { nanoid } from 'nanoid';

export const certificates = [
  {
    id: nanoid(),
    certificateName: 'HTML & CSS',

    certificateImg: htmlCssCertificateImg,
    certificateDescription:
      'Build responsive real-world websites with HTML & CSS',
  },
  {
    id: nanoid(),
    certificateName: 'JavaScript',
    certificateImg: javaScriptCertificateImg,
    certificateDescription:
      'The complete JavaScript Course From Zero to Expert',
  },
  {
    id: nanoid(),
    certificateName: 'React 18 Tutorial and Projects',
    certificateImg: reactCertificateImg,
    certificateDescription:
      'The complete JavaScript Course From Zero to Expert',
  },
  {
    id: nanoid(),
    certificateName: 'CSS Bootcamp - Master CSS (CSS Grid / CSS Flexbox)',
    certificateImg: cssCertificateImg,
    certificateDescription:
      'The complete JavaScript Course From Zero to Expert',
  },
];
