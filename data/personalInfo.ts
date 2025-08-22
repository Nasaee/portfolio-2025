import { differenceInYears } from 'date-fns';

const bornDate = new Date(1992, 11, 23);
const today = new Date();

export const personalInfo = {
  th: {
    intro:
      'สวัสดีครับ ผม นาซาอี — นักพัฒนา Full-Stack ที่ชอบแปลงไอเดียให้กลายเป็นเว็บแอปที่ลื่นไหลและใช้สนุก Stack ที่คุ้นเคย: React, Node.js, TypeScript, Next.js, MongoDB/Postgres',
    firstName: 'นาซาอี',
    lastName: 'หมัดอะดัม',
    address: 'พัฒนาการ, ประเวศ, ประเวศ, กรุงเทพมหานคร',
    age: differenceInYears(today, bornDate),
    graduateFrom: 'Kolej Universiti Insaniah (Malaysia)',
    programe: 'อักษรศาสตร์ ภาษาอาหรับ',
  },
  en: {
    intro:
      "Hi, I'm Nasaee — a full-stack developer who loves turning ideas into smooth, fun web apps. Familiar stacks: React, Node.js, TypeScript, Next.js, MongoDB/Postgres.",
    firstName: 'Nasaee',
    lastName: 'Madadam',
    address: 'Phatthanakarn, Prawet, Prawet, Bangkok, Thailand',
    age: differenceInYears(today, bornDate),
    graduateFrom: 'Kolej Universiti Insaniah (Malaysia)',
    programe: 'Bachelor of Arabic language',
  },
};
