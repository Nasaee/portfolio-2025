'use client';

import CardButton from '@/components/CardButton';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import {
  BiDownload,
  BiLinkExternal,
  BiPrinter,
  BiSolidFilePdf,
} from 'react-icons/bi';
import { cn } from '@/utils/utils';

const TranscriptButton = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimerRef = useRef<number | null>(null);

  // 👉 เพิ่มตัวกัน timeout เก่า & เก็บสถานะโหลดล่าสุด
  const runIdRef = useRef(0);
  const loadedRef = useRef(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

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

  // ✅ FIX: คุม timeout ด้วย runId + HEAD เช็กไฟล์
  useEffect(() => {
    if (!open) {
      // invalidate รอบก่อน ๆ
      runIdRef.current++;
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
      setLoaded(false);
      loadedRef.current = false;
      setFailed(false);
      return;
    }

    const myRun = ++runIdRef.current;
    setLoaded(false);
    loadedRef.current = false;
    setFailed(false);

    // ตั้ง timeout แต่ยิงก็ต่อเมื่อ runId ยังตรงและยังไม่ loaded
    loadTimerRef.current = window.setTimeout(() => {
      if (myRun === runIdRef.current && !loadedRef.current) {
        setFailed(true);
      }
    }, 15000);

    // ยิง HEAD เพื่อกัน onLoad ไม่ยิง → เคลียร์ timer + mark loaded
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch('/resume.pdf', {
          method: 'HEAD',
          cache: 'no-store',
          signal: ac.signal,
        });
        if (res.ok && myRun === runIdRef.current) {
          // ให้ผ่านโหลด (สเกเลตันหาย) แล้วเคลียร์ timer
          loadedRef.current = true;
          setLoaded(true);
          setFailed(false);
          if (loadTimerRef.current) {
            clearTimeout(loadTimerRef.current);
            loadTimerRef.current = null;
          }
        }
      } catch {
        // ถ้า HEAD ล้มเหลว ปล่อยให้ timeout ตัดสิน
      }
    })();

    return () => {
      ac.abort();
      // invalidate รอบนี้
      runIdRef.current++;
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
        loadTimerRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onPdfLoaded = () => {
    // ถ้า iframe ยิง onLoad มาก็ confirm อีกที
    loadedRef.current = true;
    setLoaded(true);
    setFailed(false);
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
  };

  const onPdfError = () => {
    // mark fail เฉพาะยังเป็น run ปัจจุบันและยังไม่ loaded
    if (!loadedRef.current) setFailed(true);
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
  };

  const handlePrint = () => {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  const tb = isMobile ? 48 : 56;

  console.log('isMobile', isMobile);

  return (
    <>
      <CardButton
        text='Resume'
        icon={<BiSolidFilePdf size={30} className='text-red-500' />}
        onClick={() => setOpen(true)}
      />

      <div
        className={cn(
          'fixed inset-0 z-100 p-6 translate-x-[100%] transition-all duration-300 ease-in-out bg-violet-100',
          open && 'translate-x-0'
        )}
      >
        <div className='flex h-[100dvh] flex-col bg-white dark:bg-neutral-900 shadow-2xl'>
          {/* Toolbar */}
          <div className='sticky top-0 z-[120] flex items-center justify-between gap-2 border-b border-black/10 bg-white/95 px-3 py-2 backdrop-blur dark:border-white/10 dark:bg-neutral-900/90'>
            <span className='inline-flex items-center gap-2 rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-200'>
              <BiSolidFilePdf /> transcript.pdf
            </span>

            <div className='flex items-center gap-2'>
              <a
                href='/transcript.pdf'
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

            {/* Renderer */}
            {!failed && (
              <iframe
                ref={iframeRef}
                src={`/transcript.pdf${isMobile ? '' : '#toolbar=0'}`} // ปิดทูลบาร์ native บางตัว
                title='Resume PDF'
                className='absolute inset-0 block h-full w-full'
                loading='eager'
                onLoad={onPdfLoaded}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TranscriptButton;

// 'use client';

// import CardButton from '@/components/CardButton';
// import { useLangStore } from '@/store/useLangStore';
// import { useState } from 'react';
// import { BiSolidFilePdf } from 'react-icons/bi';

// const TranscriptButton = () => {
//   const lang = useLangStore((s) => s.lang);
//   return (
//     <CardButton
//       text={lang === 'en' ? 'Transcript' : 'ใบประกาศนียบัตร'}
//       icon={<BiSolidFilePdf size={30} className='text-red-500' />}
//       onClick={() => {}}
//     />
//   );
// };

// export default TranscriptButton;
