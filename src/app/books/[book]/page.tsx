//********************//
//* Single Book Page *//
//********************//
import Link from 'next/link';
import { BookCover } from '@/components/BookCover';

//********************//
//* Type Definations *//
//********************//
// type of Books Response from API
interface Books {
  id: number;
  name: string;
  type: string;
  available: boolean;
}
// Type Defination of single book data from the API
interface Book extends Books {
  author: string;
  isbn: string;
  price: number;
  'current-stock': number;
  error?: string;
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

//**********************************************//
//* Function to get a single Book from the API *//
//**********************************************//
async function getBook(id: number): Promise<Book | 'error'> {
  const res = await fetch(`https://simple-books-api.glitch.me/books/${id}`);
  if (!res.ok) {
    return 'error';
  }
  return res.json();
}

//**********************************************//
//* Function to extract bokk IDs from list     *//
//* IDs to be used for geberating static param *//
//**********************************************//
async function getBookIds() {
  let booksIds: string[] = [];
  const books: Books[] | 'error' = await getBooks();
  if (books != 'error') {
    books.map((book) => {
      booksIds.push(book.id.toString());
    });
  }
  return booksIds;
}

//**************************//
//* Generate Static params *//
//**************************//
export async function generateStaticParams() {
  let booksIds: string[] = await getBookIds();
  return booksIds.map((bookId) => ({
    book: bookId,
  }));
}

//**************//
//* Book Pages *//
//**************//
export default async function Book({ params }: { params: { book: number } }) {
  let book = await getBook(params.book);
  //******************************************//
  //* When No book avaialble for specific ID *//
  //* Error response from server             *//
  //* Page Title, error msg                  *//
  //* button to go to books page             *//
  //******************************************//
  if (book === 'error' || book.error) {
    return (
      <div className='flex flex-col pb-5'>
        <h1 className='text-center font-bold text-2xl pb-12'>404</h1>
        <div className='w-[250px] h-[300px] mx-auto rounded-2xl flex flex-col justify-center items-center border border-gray-600 shadow-md shadow-gray-800'>
          <p>No such book Available</p>
          <p className='mt-5'>
            Go to{' '}
            <Link
              href={'./books'}
              className='font-semibold hover:cursor-pointer'
            >
              books
            </Link>
            page
          </p>
        </div>
      </div>
    );
  }
  //*****************************************//
  //* When a book avaialble for specific ID *//
  //* Error response from server            *//
  //* Page Title                            *//
  //* Book Image, Details                   *//
  //* button to go to placeOrder Page       *//
  //*****************************************//
  return (
    <div className='flex flex-col pb-5'>
      {/* Page title */}
      <h1 className='text-center font-bold text-2xl pb-12'>{book.name}</h1>
      {/* Book Details + Image + button*/}
      <div className='flex space-y-8 xmd:space-y-0 flex-col xmd:flex-row px-10 text-gray-700 justify-center items-center'>
        {/* Book Image */}
        <div className='flex-grow flex justify-center xmd:basis-1/2'>
          <div className='rounded-2xl overflow-hidden w-[140px] h-[216px] md:w-[280px] md:h-[432px]'>
            <BookCover bookId={book.id} />
          </div>
        </div>
        {/* Book Details */}
        <div className='flex-grow space-y-3 border border-gray-600 shadow-md shadow-gray-800 rounded-3xl py-5 px-5 xmd:basis-1/2 min-w-[300px]'>
          <div>
            <p>Title : </p>
            <p>&emsp;{book.name}</p>
          </div>
          <div>
            <p>Author : </p>
            <p>&emsp;{book.author}</p>
          </div>
          <div>
            <p>Type : </p>
            <p>&emsp;{book.type}</p>
          </div>
          <div className='flex flex-col justify-between xmd:flex-row'>
            <div className='basis-1/2'>
              <p>Price : </p>
              <p>&emsp;{book.price}</p>
            </div>
            <div className='basis-1/2 text-left'>
              <p>Stock : </p>
              <p>&emsp;{book['current-stock']} copies</p>
            </div>
          </div>
          <div className='flex flex-col justify-between xmd:flex-row'>
            <div className='basis-1/2'>
              <p>Book ID : </p>
              <p>&emsp;{book.id}</p>
            </div>
            <div className='basis-1/2 text-left'>
              <p>ISBN : </p>
              <p>&emsp;{book.isbn}</p>
            </div>
          </div>
          <div>
            {book.available ? (
              <p className='text-green-900'>Available</p>
            ) : (
              <p className='text-red-900'>Out of Stock</p>
            )}
          </div>
          {/****************************/}
          {/* Button to place Order    */}
          {/* Disabled if out of stock */}
          {/****************************/}
          <div className='flex justify-center'>
            {book.available ? (
              <Link href={`./books/${book.id}/placeorder`}>
                <button
                  className={`w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700`}
                >
                  Place Order
                </button>
              </Link>
            ) : (
              <button
                className={`w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700 cursor-not-allowed`}
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
