'use client';

import CardButton from '@/components/CardButton';
import { cn } from '@/utils/utils';
import { useEffect, useRef, useState } from 'react';
import {
  BiSolidFilePdf,
  BiDownload,
  BiLinkExternal,
  BiPrinter,
} from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

const ResumeButton = () => {
  const [open, setOpen] = useState(false);

  // สถานะการโหลด PDF
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // ตรวจอุปกรณ์ (มือถือ/เดสก์ท็อป) เพื่อเลือก renderer ที่เสถียรกว่า
  const [isMobile, setIsMobile] = useState(false);

  // อ้างอิง iframe (ไว้สั่ง print) และ timeout
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimerRef = useRef<number | null>(null);

  // โฟกัสปุ่มปิดเมื่อเปิด drawer
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // --- Detect mobile (<= 640px) ---
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // --- Body scroll lock เมื่อเปิด drawer ---
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  // --- ตั้ง timeout เผื่อ onLoad ไม่ยิง / โหลดช้า ---
  useEffect(() => {
    if (!open) {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
      setLoaded(false);
      setFailed(false);
      return;
    }

    setLoaded(false);
    setFailed(false);

    loadTimerRef.current = window.setTimeout(() => {
      setFailed(true);
    }, 12000); // เผื่อมือถือ/เน็ตช้า

    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
    };
  }, [open]);

  // --- ปิดด้วย ESC ---
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const clearLoadTimer = () => {
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
  };

  const onPdfLoaded = () => {
    setLoaded(true);
    setFailed(false);
    clearLoadTimer();
  };

  const onPdfError = () => {
    setFailed(true);
    clearLoadTimer();
  };

  const handlePrint = () => {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  // ความสูง toolbar: มือถือเตี้ยกว่านิด
  const tb = isMobile ? 48 : 56;

  return (
    <>
      <CardButton
        text='Resume'
        icon={<BiSolidFilePdf size={30} className='text-red-500' />}
        onClick={() => setOpen(true)}
      />

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px]',
          'motion-safe:transition-opacity motion-safe:duration-300',
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer Panel (ทั้ง section เลื่อนออก/เข้า) */}
      <section
        role='dialog'
        aria-modal='true'
        aria-label='Resume PDF Viewer'
        tabIndex={-1}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className={cn(
          'fixed inset-y-0 right-0 z-[110] w-[min(900px,96vw)]',
          // ทำให้ animation ลื่นด้วย GPU
          'transform-gpu will-change-transform',
          // ทรานซิชันเข้า-ออก
          'motion-safe:transition-transform motion-safe:duration-300',
          // เริ่มปิดไว้ด้วย translate-x-full แล้วค่อยเปิดเป็น 0
          open
            ? 'translate-x-0 ease-out'
            : 'translate-x-[101%] ease-in pointer-events-none'
        )}
      >
        <div className='flex h-[100dvh] flex-col bg-white dark:bg-neutral-900 shadow-2xl'>
          {/* Toolbar */}
          <div
            className='sticky top-0 z-[120] flex items-center justify-between gap-2
                       border-b border-black/10 bg-white/95 px-3 py-2 backdrop-blur
                       dark:border-white/10 dark:bg-neutral-900/90'
          >
            <span className='inline-flex items-center gap-2 rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-200'>
              <BiSolidFilePdf /> Resume.pdf
            </span>

            <div className='flex items-center gap-2'>
              <a
                href='/resume.pdf'
                download
                className='inline-flex items-center gap-2 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm hover:bg-black/5 active:scale-95 dark:border-white/10 dark:hover:bg-white/5'
              >
                <BiDownload /> Download
              </a>
              <a
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm hover:bg-black/5 active:scale-95 dark:border-white/10 dark:hover:bg-white/5'
              >
                <BiLinkExternal /> New tab
              </a>
              {!isMobile && (
                <button
                  onClick={handlePrint}
                  className='inline-flex items-center gap-2 rounded-lg border border-black/10 px-2.5 py-1.5 text-sm hover:bg-black/5 active:scale-95 dark:border-white/10 dark:hover:bg-white/5'
                >
                  <BiPrinter /> Print
                </button>
              )}
              <button
                ref={closeBtnRef}
                aria-label='Close'
                onClick={() => setOpen(false)}
                className='ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:text-gray-300 dark:hover:bg-white/10'
              >
                <IoMdClose className='text-2xl' />
              </button>
            </div>
          </div>

          {/* Viewer */}
          <div
            className='relative flex-1 overflow-hidden rounded-none border border-black/10 bg-white shadow-none dark:border-white/10 dark:bg-neutral-900'
            style={{ height: `calc(100dvh - ${tb}px)` }}
          >
            {/* Loading */}
            {!loaded && !failed && (
              <div className='absolute inset-0 grid place-items-center'>
                <div className='flex flex-col items-center gap-3'>
                  <div className='h-9 w-9 animate-spin rounded-full border-2 border-black/20 border-t-black/60 dark:border-white/20 dark:border-t-white/60' />
                  <p className='text-sm text-black/60 dark:text-white/60'>
                    Loading PDF…
                  </p>
                </div>
              </div>
            )}

            {/* Fallback */}
            {failed && (
              <div className='absolute inset-0 grid place-items-center p-6 text-center'>
                <div className='max-w-md'>
                  <p className='mb-3 text-base font-medium'>
                    ไม่สามารถแสดง PDF ในเบราว์เซอร์ได้
                  </p>
                  <p className='mb-4 text-sm text-black/60 dark:text-white/60'>
                    อาจเกิดจากปลั๊กอินหรือการตั้งค่าความปลอดภัยของเบราว์เซอร์
                  </p>
                  <div className='flex items-center justify-center gap-2'>
                    <a
                      href='/resume.pdf'
                      download
                      className='rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black'
                    >
                      ดาวน์โหลดไฟล์
                    </a>
                    <a
                      href='/resume.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10'
                    >
                      เปิดในแท็บใหม่
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Renderer: มือถือใช้ <object> / เดสก์ท็อปใช้ <iframe> */}
            {!failed && (
              <>
                {isMobile ? (
                  <object
                    data='/resume.pdf#view=FitH'
                    type='application/pdf'
                    className='absolute inset-0 block h-full w-full'
                    aria-label='Resume PDF'
                    onLoad={onPdfLoaded as any}
                    onError={onPdfError as any}
                  />
                ) : (
                  <iframe
                    ref={iframeRef}
                    src='/resume.pdf#toolbar=0'
                    title='Resume PDF'
                    className='absolute inset-0 block h-full w-full'
                    onLoad={onPdfLoaded}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeButton;
