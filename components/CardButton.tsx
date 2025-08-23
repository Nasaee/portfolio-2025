import { ReactNode } from 'react';

const CardButton = ({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className='flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-br from-violet-700 to-violet-900 rounded-sm cursor-pointer w-full lg:w-[250px] tracking-wider hover:scale-110 transition-all duration-300'
      onClick={onClick}
    >
      {icon}
      <p className='text-lg'>{text}</p>
    </button>
  );
};

export default CardButton;
