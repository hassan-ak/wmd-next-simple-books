//***************************//
//* Return Book Cover Image *//
//* Based on book ID        *//
//***************************//

import React from 'react';
import Image from 'next/image';
import blank from '../../public/blank.png';
import untamed from '../../public/untamed.png';
import justAsIAm from '../../public/justAsIAm.png';
import theRussion from '../../public/theRussion.png';
import theVanishingHalf from '../../public/theVanishingHalf.png';
import theMidnightLibrary from '../../public/theMidnightLibrary.png';
import viscountWhoLovedMe from '../../public/viscountWhoLovedMe.png';

type Props = {
  bookId: number;
};

export const BookCover = ({ bookId }: Props) => {
  switch (bookId) {
    case 1:
      return (
        <Image
          src={theRussion}
          alt='The Russion'
          className='object-cover'
          priority
        />
      );
    case 2:
      return (
        <Image
          src={justAsIAm}
          alt='Just as I Am'
          className='object-cover'
          priority
        />
      );
    case 3:
      return (
        <Image
          src={theVanishingHalf}
          alt='The Vanishing Half'
          className='object-cover'
          priority
        />
      );
    case 4:
      return (
        <Image
          src={theMidnightLibrary}
          alt='The Midnight Library'
          className='object-cover'
          priority
        />
      );
    case 5:
      return (
        <Image src={untamed} alt='Untamed' className='object-cover' priority />
      );
    case 6:
      return (
        <Image
          src={viscountWhoLovedMe}
          alt='Viscount Who Loved Me'
          className='object-cover'
          priority
        />
      );
    default:
      return (
        <Image
          src={blank}
          alt='Viscount Who Loved Me'
          className='object-cover'
          priority
        />
      );
  }
};
