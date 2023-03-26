//*************//
//* Home Page *//
//*************//

import Link from 'next/link';
import Image from 'next/image';
import hero from '../../public/hero.png';

//***************************************//
//* Home Page / Hero Section            *//
//* App title / tagline                 *//
//* Description                         *//
//* Hero Image                          *//
//* Button for naviagting to books page *//
//***************************************//
export default function Home() {
  return (
    <div className='flex flex-col max-w-[960px] mx-auto items-center md:flex-row space-y-8 md:space-y-0'>
      <div className='px-4 xs:px-16'>
        <h1 className='text-3xl font-bold'>Book Store</h1>
        <p>Find your next great read with us.</p>
        <p className='text-justify mt-5'>
          Welcome to our online store! We&#39;re thrilled to have you here. Our
          store offers a wide range of high-quality products at competitive
          prices. Whether you&#39;re looking for the latest electronics, trendy
          fashion, or home essentials, we&#39;ve got you covered. Our
          user-friendly website makes it easy to find what you&#39;re looking
          for, with detailed product descriptions and images that showcase every
          detail. Plus, our secure checkout process ensures your information is
          always safe and protected.
        </p>
        <Link href={'./books'}>
          <button className='mt-5 w-fit p-3 rounded-xl text-gray-50 bg-[#383535]'>
            Explore Books
          </button>
        </Link>
      </div>
      <div className='w-[300px] flex-shrink-0 sm:w-[400px] bg-slate-400 rounded-2xl'>
        <Image
          src={hero}
          alt=''
          width={400}
          className='rounded-2xl'
          priority
        ></Image>
      </div>
    </div>
  );
}
