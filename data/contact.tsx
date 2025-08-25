import { nanoid } from 'nanoid';
import { SiGmail } from 'react-icons/si';
import { ImPhone } from 'react-icons/im';
import { FaFacebook } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';

export const contacts = {
  email: {
    id: nanoid(),
    address: 'nasaee.dev@gmail.com',
    icon: <SiGmail />,
  },
  phone: {
    id: nanoid(),
    phoneNo: '0831841131',
    icon: <ImPhone />,
  },
  facebook: {
    id: nanoid(),
    userName: 'Nasa-ee Madadam',
    url: 'https://www.facebook.com/nasaee.madadam',
    icon: <FaFacebook />,
  },
  linkIn: {
    id: nanoid(),
    userName: 'Nasa-ee Madadam',
    url: 'https://www.linkedin.com/in/nasa-ee-madadam-b3a0b7272/',
    icon: <BsLinkedin />,
  },
};
