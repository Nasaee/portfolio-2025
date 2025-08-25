'use client';

import CardButton from '@/components/CardButton';
import { BiSolidFilePdf } from 'react-icons/bi';

const TranscriptButton = () => {
  return (
    <a
      href='/transcript.pdf'
      target='_blank'
      rel='noopener noreferrer'
      className='w-full lg:w-[250px]'
    >
      <CardButton
        text='Transcript'
        icon={<BiSolidFilePdf size={30} className='text-red-500' />}
      />
    </a>
  );
};

export default TranscriptButton;
