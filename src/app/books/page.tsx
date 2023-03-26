//************************************//
//* List all books on a  single Page *//
//************************************//
import React from 'react';
import Link from 'next/link';
import { BookCover } from '@/components/BookCover';

//********************//
//* Type Definations *//
//********************//
// Single Book Response from API
interface Books {
  id: number;
  name: string;
  type: string;
  available: boolean;
}

//**************************************//
//* Function to get Books from the API *//
//* Returns list of books or 'error'   *//
//**************************************//
async function getBooks(): Promise<Books[] | 'error'> {
  const res = await fetch('https://simple-books-api.glitch.me/books');
  if (!res.ok) {
    return 'error';
  }
  return res.json();
}

//**************//
//* Books Page *//
//**************//
export default async function Books() {
  // Get books from the API
  let books: Books[] | 'error' = await getBooks();
  //******************************************//
  //* In case of error response from the API *//
  //******************************************//
  if (books === 'error') {
    return (
      <div className='flex flex-col pb-5'>
        {/* Page title */}
        <h1 className='text-center font-bold text-2xl pb-12'>List of Books</h1>
        <div className='w-[250px] h-[300px] mx-auto rounded-2xl flex justify-center items-center border border-gray-600 shadow-md shadow-gray-800'>
          No book Available
        </div>
      </div>
    );
  }
  //************************************//
  //* When API respond with books list *//
  //************************************//
  return (
    <div className='flex flex-col pb-5'>
      {/* Page title */}
      <h1 className='text-center font-bold text-2xl pb-12'>List of Books</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-3'>
        {/************************************************/}
        {/* Map over books and create card for each book */}
        {/************************************************/}
        {books.map((book: Books) => {
          return (
            <div
              className='space-y-5 bg-gradient-to-br p-3 rounded-xl flex flex-col justify-center items-center border border-gray-600 shadow-md shadow-gray-800'
              key={book.id}
            >
              {/* Book title, cover image and type*/}
              <p className='w-full text-lg font-semibold'>{book.name}</p>
              <div className='rounded-2xl overflow-hidden w-[140px] h-[216px]'>
                <BookCover bookId={book.id} />
              </div>
              <p>({book.type})</p>
              {/* Book Details button and Availability */}
              <div className='w-full flex justify-around items-center'>
                <Link
                  href={`./books/${book.id}`}
                  className='bg-[#383535] rounded-lg text-gray-50 p-2 hover:cursor-pointer hover:scale-[1.1]'
                >
                  Details
                </Link>
                <div> {book.available ? <span>✅</span> : <span>⭕</span>}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
