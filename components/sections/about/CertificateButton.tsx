'use client';

import CardButton from '@/components/CardButton';
import { useLangStore } from '@/store/useLangStore';
import { BsArrowRightCircleFill } from 'react-icons/bs';

const CertificateButton = () => {
  const lang = useLangStore((s) => s.lang);
  return (
    <CardButton
      text={lang === 'en' ? 'Certificate' : 'ใบรับรอง'}
      icon={<BsArrowRightCircleFill size={30} className='text-gray-200' />}
      onClick={() => {}}
    />
  );
};

export default CertificateButton;
