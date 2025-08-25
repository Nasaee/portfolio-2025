'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

import CardButton from '@/components/CardButton';
import { certificates } from '@/data/certificate';
import { cn } from '@/utils/utils';

const CertificateButton = () => {
  const [open, setOpen] = useState(false);

  // ล็อก body ไม่ให้เลื่อนเมื่อ Drawer เปิด + ปิดด้วย ESC
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <CardButton
        text='Certificate'
        icon={<BsArrowRightCircleFill size={30} className='text-gray-200' />}
        onClick={() => setOpen(true)}
      />

      {/* Wrapper ครอบ backdrop + panel */}
      <div
        className={cn(
          'fixed inset-0 z-50',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={close}
          className={cn(
            'absolute inset-0 bg-black/40 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Slide-in Panel */}
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Certificates'
          className={cn(
            'absolute inset-0', // 👈 กินเต็มทั้งจอแน่นอน
            'bg-violet-100 text-gray-700 p-6 min-h-dvh overflow-y-auto overscroll-contain pb-24',
            'translate-x-full transition-transform duration-300 ease-in-out',
            open && 'translate-x-0'
          )}
        >
          {/* Header  */}
          <div className='z-10 -mx-6 -mt-6 mb-4 px-6 py-4 bg-violet-100/80 backdrop-blur supports-[backdrop-filter]:bg-violet-100/60 flex items-center justify-between'>
            <h4 className='text-2xl md:text-3xl font-bold tracking-wide text-gray-900 mb-5'>
              Certificate
            </h4>
            <button
              type='button'
              aria-label='Close'
              onClick={close}
              className='rounded-full p-1 bg-violet-600 text-gray-50 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              <IoMdClose size={26} />
            </button>
          </div>

          {/* เนื้อหา */}
          <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {certificates.map((item) => (
                <a
                  key={item.id}
                  href={item.certificateImg.src}
                  target='_blank'
                  rel='noreferrer'
                  className='certificate block bg-gray-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300'
                >
                  <Image
                    width={item.certificateImg.width}
                    height={item.certificateImg.height}
                    src={item.certificateImg.src}
                    alt={item.certificateName}
                    loading='lazy'
                    // ช่วย responsive/ประหยัดแบนด์วิดท์
                    sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                    className='w-full h-auto object-contain'
                  />
                  <h5 className='text-center text-xl md:text-2xl font-semibold py-2 text-white tracking-wider'>
                    {item.certificateName}
                  </h5>
                </a>
              ))}
            </div>

            {/* กันชนล่างเพิ่มเติม (เผื่อมากกว่า pb-24) */}
            <div className='h-8' />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateButton;
