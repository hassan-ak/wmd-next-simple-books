//*******************//
//* Header / NAvBAr *//
//*******************//
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

export const Header = () => {
  return (
    <div className='flex justify-between px-10 py-2 items-center bg-gray-100 mb-5'>
      <Link href='.'>
        <Image src={logo} alt='logo' width={52}></Image>
      </Link>
      <div className='flex-grow flex justify-end space-x-3 text-sm sm:text-base sm:space-x-8'>
        <Link href='./books' className='opacity-75 hover:opacity-100'>
          Books
        </Link>
        <Link href='./orders' className='opacity-75 hover:opacity-100'>
          Orders
        </Link>
        <Link href={'./login'} className='opacity-75 hover:opacity-100'>
          Login
        </Link>
      </div>
    </div>
  );
};
