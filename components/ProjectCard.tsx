import { Project } from '@/data/projectData';
import Image from 'next/image';
import React from 'react';

const ProjectCard = ({
  project,
  lang,
}: {
  project: Project;
  lang: 'en' | 'th';
}) => {
  const { title, url, img, sourceCode, infoEng, infoTh, technology } = project;

  return (
    <div className='group relative overflow-hidden rounded-xl'>
      {/* Card */}
      <div className='flex flex-col h-[520px] shadow-2xl'>
        <Image
          src={img}
          alt={title}
          width={img.width}
          height={img.height}
          className='h-[70%] w-full object-cover'
        />
        <div className='flex flex-wrap items-start gap-3 h-[30%] p-5 bg-gradient-to-br from-violet-700 to-violet-900 overflow-y-auto'>
          {technology.map((tech) => (
            <p
              key={tech}
              className='text-md text-violet-700 font-semibold py-1 px-3 rounded-2xl bg-gray-50 shadow-sm'
            >
              {tech}
            </p>
          ))}
        </div>
      </div>

      {/* Overlay gradient (แทน ::before) */}
      <div className='pointer-events-none absolute inset-0 h-0 bg-gradient-to-r from-fuchsia-700 to-indigo-800 opacity-95 transition-[height] duration-500 ease-in-out group-hover:h-full z-[1]' />

      {/* Content บน overlay */}
      <div className='absolute left-1/2 top-[65%] z-10 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center opacity-0 transition-all duration-500 ease-in-out group-hover:top-1/2 group-hover:opacity-100'>
        <h4 className='mb-4 text-center font-black uppercase text-[1.8rem] text-white tracking-wider'>
          {title}
        </h4>
        <p className='mb-12 text-left text-[1.4rem] text-gray-100'>
          {lang === 'en' ? infoEng : infoTh}
        </p>

        <div className='flex items-center justify-center gap-6'>
          {url && (
            <a
              href={url}
              target='_blank'
              rel='noreferrer'
              className='rounded-xl border border-violet-text-violet-950 bg-violet-text-violet-950 px-8 py-4 font-extrabold tracking-wider text-gray-100 transition-transform duration-200 hover:scale-105  text-[clamp(0.8rem,1vw,1rem)]'
            >
              See Live
            </a>
          )}
          {sourceCode && (
            <a
              href={sourceCode}
              target='_blank'
              rel='noreferrer'
              className='rounded-xl border border-violet-text-violet-950 bg-transparent px-8 py-4 font-extrabold text-gray-100 tracking-wider transition-transform duration-200 hover:scale-105  text-[clamp(0.8rem,1vw,1rem)]'
            >
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
