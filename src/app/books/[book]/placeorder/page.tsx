'use client';

//********************//
//* Place Order Page *//
//********************//
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { selectedUser } from '@/slices/userSlice';
import { BookCover } from '@/components/BookCover';

//********************//
//* Type Definations *//
//********************//
// Response form placing order API
type PlaceResponse =
  | { created: boolean; orderId: string }
  | 'error'
  | undefined;

//********************//
//* Place Order Page *//
//********************//
export default function PlaceOrder() {
  // Get base URL to be used in Fetch request
  const baseUrl = process.env.BASE_URL;

  //*********************************//
  //* Fetch User Deatils from Store *//
  //*********************************//
  const user = useSelector(selectedUser);
  //************************//
  //* Get Book ID from URL *//
  //************************//
  const id = usePathname().substring(
    usePathname().indexOf('/books/') + '/books/'.length,
    usePathname().indexOf('/placeorder')
  );

  /*********************/
  //* State Menagement */
  /*********************/
  const [orderPlaced, setOrderPlaced] = useState(false); // keep record if  request for order is made or not
  const [consumerName, setConsumerName] = useState(''); // Customer Name to be used in API request
  const [placeOrderRes, setPlaceOrderRes] = useState<PlaceResponse>(); // APi response

  //***********************************************//
  //* Functon to send post request                *//
  //* request to place Order                      *//
  //* accept auth token and body with id and name *//
  //***********************************************//
  function signUp() {
    fetch(`${baseUrl}/api/placeOrderHandler`, {
      method: 'POST',
      headers: { Authorization: user, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: id,
        customerName: consumerName,
      }),
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setPlaceOrderRes(data))
      .catch(() => setPlaceOrderRes('error'));
  }

  //********//
  //* Page *//
  //********//
  return (
    <div className='flex flex-col pb-5 justify-center items-center'>
      {/* Page title */}
      <h1 className='text-center font-bold text-2xl pb-12'>Place Order</h1>
      <div className='flex flex-col justify-center items-center border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
        {/********************************/}
        {/* Book Cover image based on ID */}
        {/********************************/}
        <div className='w-[70px] h-[108px] object-cover rounded-xl overflow-hidden mx-auto xmd:mx-1'>
          <BookCover bookId={parseInt(id)} />
        </div>

        {!orderPlaced ? (
          //***********************************************//
          //* When request for placing order is not made  *//
          //* Display a form and button                   *//
          //* on button click call apii for placing order *//
          //* on button click set request state to true   *//
          //***********************************************//
          <div>
            <div className='flex flex-col mt-5'>
              <label className='py-1 text-sm uppercase'>Consumer Name</label>
              <input
                className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'
                type='text'
                onChange={(e) => {
                  setConsumerName(e.target.value);
                }}
              />
            </div>
            <div className='flex justify-center'>
              <button
                className='w-fill mt-4 rounded-lg p-2 text-center text-gray-50 bg-[#383535]'
                onClick={() => {
                  signUp();
                  setOrderPlaced(true);
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        ) : //
        //***************************************//
        //* When request for placing order made *//
        //***************************************//
        !placeOrderRes ? (
          //*********************************************//
          //* When request is made and response pending *//
          //*********************************************//
          <div>
            <div className='flex flex-col mt-5 w-[265px]'>
              <p className='py-1 text-sm uppercase'>Placing Order</p>
              <p className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'>
                Loading ...
              </p>
            </div>
            <div className='flex justify-center'>
              <button className='w-fill mt-4 rounded-lg p-2 text-center text-gray-50 bg-[#383535]'>
                ...........
              </button>
            </div>
          </div>
        ) : //
        //*****************************************//
        //* When request is made and api responds *//
        //*****************************************//
        placeOrderRes === 'error' ? (
          //*******************************************************//
          //* When request is made and api responds with error    *//
          //* On button click clear form and set request to false *//
          //*******************************************************//
          <div>
            <div className='flex flex-col mt-5 w-[265px]'>
              <p className='py-1 text-sm uppercase'>Error</p>
              <p className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'>
                Check your Login.
              </p>
            </div>

            <div className='flex justify-center'>
              <button
                className='w-fill mt-4 rounded-lg p-2 text-center text-gray-50 bg-[#383535]'
                onClick={() => {
                  setOrderPlaced(false);
                  setPlaceOrderRes(undefined);
                }}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          //*******************************************************//
          //* When request is made and api responds with data     *//
          //* On button click move to specific order details page *//
          //*******************************************************//
          <div>
            <div className='flex flex-col mt-5 w-[265px]'>
              <p className='py-1 text-sm uppercase'>Order Placed</p>
              <p className='flex rounded-lg border-2 text-xs border-gray-300 p-2 text-gray-700'>
                Order Id : {placeOrderRes.orderId}
              </p>
            </div>
            <div className='flex justify-center'>
              <Link href={`./orders/${placeOrderRes.orderId}`}>
                <button className='w-fill mt-4 rounded-lg p-2 text-center text-gray-50 bg-[#383535]'>
                  Explore Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
