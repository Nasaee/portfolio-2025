import { socials } from '@/data/socialsData';

const colorClasses: Record<string, string> = {
  Github: 'hover:text-white',
  Email: 'hover:text-[#fa5252]',
  Facebook: 'hover:text-[#364fc7]',
  LinkIN: 'hover:text-[#1864ab]',
  Default: 'hover:text-[#82868c]',
};

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-gray-800 to-[#1d242f] py-12'>
      <ul className='flex justify-center gap-12 p-[1.5rem]'>
        {socials.map((social) => {
          const { icon: Icon, id, url, name } = social;

          return (
            <li key={id}>
              <a
                href={name.toLowerCase() === 'email' ? `mailto:${url}` : url}
                target='_blank'
                rel='noreferrer'
              >
                <Icon
                  size={30}
                  className={`text-[#b4b6ba] transition-all duration-300 hover:scale-[1.3] ${
                    colorClasses[name] || colorClasses.Default
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>

      {/* separator */}
      <div className='w-[50%] mx-auto border-b border-[#b4b6ba]' />

      {/* copyright */}
      <div className='flex justify-center gap-4 pt-6 text-[#b4b6ba] tracking-wider font-semibold'>
        <span className='copyright'>&#169; {new Date().getFullYear()}</span>
        <span className='deverloper'>
          Portfolio deverloped by Nasaee Madadam
        </span>
      </div>
    </footer>
  );
};

export default Footer;
