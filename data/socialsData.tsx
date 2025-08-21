import { nanoid } from 'nanoid';
import { FiGithub, FiFacebook, FiLinkedin, FiMail } from 'react-icons/fi';

export const socials = [
  {
    id: nanoid(),
    name: 'Github',
    url: 'https://github.com/Nasaee',
    icon: FiGithub,
  },
  {
    name: 'Email',
    url: 'nasaee.dev@gmail.com',
    icon: FiMail,
    id: nanoid(),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/nasaee.madadam',
    icon: FiFacebook,
    id: nanoid(),
  },
  {
    name: 'LinkIN',
    url: 'https://www.linkedin.com/in/nasa-ee-madadam-b3a0b7272/',
    icon: FiLinkedin,
    id: nanoid(),
  },
];
