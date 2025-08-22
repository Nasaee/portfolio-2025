import { nanoid } from 'nanoid';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export const socials = [
  {
    id: nanoid(),
    name: 'Github',
    url: 'https://github.com/Nasaee',
    icon: FaGithub,
  },
  {
    name: 'Email',
    url: 'nasaee.dev@gmail.com',
    icon: SiGmail,
    id: nanoid(),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/nasaee.madadam',
    icon: FaFacebook,
    id: nanoid(),
  },
  {
    name: 'LinkIN',
    url: 'https://www.linkedin.com/in/nasa-ee-madadam-b3a0b7272/',
    icon: FaLinkedin,
    id: nanoid(),
  },
];
