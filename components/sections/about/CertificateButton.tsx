'use client';

import CardButton from '@/components/CardButton';
import { certificates } from '@/data/certificate';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

const CertificateButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CardButton
        text='Certificate'
        icon={<BsArrowRightCircleFill size={30} className='text-gray-200' />}
        onClick={() => setOpen(true)}
      />
      <div
        className={cn(
          'fixed inset-0 z-100 p-6 translate-x-[100%] transition-all duration-300 ease-in-out bg-violet-100 text-gray-600',
          open && 'translate-x-0'
        )}
      >
        <div className=''>
          <button className='bg-violet-600 text-gray-50 p-1 rounded-full'>
            <IoMdClose size={30} onClick={() => setOpen(false)} />
          </button>
        </div>

        <div className='container mx-auto h-full'>
          <h4 className='text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide rext-gray-900'>
            Certificate
          </h4>

          <div className='overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-4 mt-20'>
            {certificates.map((item) => {
              return (
                <a
                  key={item.id}
                  href={item.certificateImg.src}
                  target='_blank'
                  rel='noreferrer'
                  className='certificate'
                >
                  <Image
                    width={item.certificateImg.width}
                    height={item.certificateImg.height}
                    src={item.certificateImg.src}
                    alt={item.certificateName}
                    className='min-w-[300px] max-w-[500px] h-auto object-contain'
                  />
                  <h5>{item.certificateName}</h5>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateButton;
