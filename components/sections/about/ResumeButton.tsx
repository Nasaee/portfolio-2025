'use client';

import CardButton from '@/components/CardButton';
import { BiSolidFilePdf } from 'react-icons/bi';

const ResumeButton = () => {
  return (
    <a href='/resume.pdf' target='_blank' rel='noopener noreferrer'>
      <CardButton
        text='Resume'
        icon={<BiSolidFilePdf size={30} className='text-red-500' />}
      />
    </a>
  );
};

export default ResumeButton;
