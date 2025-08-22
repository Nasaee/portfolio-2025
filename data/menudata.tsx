import { nanoid } from 'nanoid';
import { FiGithub, FiFacebook, FiLinkedin } from 'react-icons/fi';

export const menuData = [
  { id: nanoid(), name: 'Home', toId: 'home' },
  { id: nanoid(), name: 'About', toId: 'about' },
  { id: nanoid(), name: 'Skills', toId: 'skills' },
  { id: nanoid(), name: 'Projects', toId: 'projects' },
  { id: nanoid(), name: 'Contact', toId: 'contact' },
];

export const socialLinks = [
  {
    id: nanoid(),
    Icon: FiGithub,
    link: 'https://github.com/Nasaee',
  },
  {
    id: nanoid(),
    Icon: FiLinkedin,
    link: 'https://www.google.com/',
  },
  {
    id: nanoid(),
    Icon: FiFacebook,
    link: 'https://www.google.com/',
  },
];
