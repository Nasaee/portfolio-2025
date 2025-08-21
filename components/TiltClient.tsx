'use client';
import dynamic from 'next/dynamic';

// ตัวนี้จะโหลดเฉพาะฝั่ง client
const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false });
export default Tilt;
