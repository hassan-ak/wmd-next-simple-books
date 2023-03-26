'use client';

//*****************//
//* Single Order  *//
//* Manage Update *//
//*****************//
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectedUser } from '@/slices/userSlice';
import { BookCover } from '@/components/BookCover';

//*********************//
//* Type Definations  *//
//*********************//
// Component Props
type Props = {
  orderId: string;
};
// Order respose type
interface OrderDetails {
  bookId: number;
  createdBy: string;
  customerName: string;
  id: string;
  quantity: number;
  timestamp: number;
}
type OrderRes = OrderDetails | 'error' | undefined;

export default function SingleOrder({ orderId }: Props) {
  // Get base URL to be used in Fetch request
  const baseUrl = process.env.BASE_URL;

  //*********************************//
  //* Fetch User Deatils from Store *//
  //*********************************//
  const user = useSelector(selectedUser);

  //********************//
  //* State Management *//
  //********************//
  const [orderRes, setOrderRes] = useState<OrderRes>(); // Response from getOrder API
  const [editBox, setEditBox] = useState(false); // State if update box is open or not
  const [updatedRes, setUpdatedRes] = useState<any | undefined>(); // Update api response
  const [consumerName, setConsumerName] = useState(''); // usename to be updated

  //****************************************//
  //* Function to call on component render *//
  //****************************************//
  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //********************************//
  //* Function to get single order *//
  //********************************//
  function getOrder() {
    fetch(`${baseUrl}/api/orderHandler`, {
      method: 'GET',
      headers: { Authorization: user, ID: orderId },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setOrderRes(data))
      .catch(() => setOrderRes('error'));
  }

  //*******************************//
  //* Function to update an order *//
  //*******************************//
  function updateOrder() {
    fetch(`${baseUrl}/api/updateOrderHandler`, {
      method: 'PATCH',
      headers: {
        Authorization: user,
        ID: orderId,
        consumerName: consumerName,
      },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setUpdatedRes(data))
      .catch(() => setUpdatedRes('error'));
  }

  //******************************//
  //* No Response from Order API *//
  //******************************//
  if (!orderRes) {
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        Loading ...
      </div>
    );
  }

  //**********************************//
  //* Error response from order API  *//
  //**********************************//
  if (orderRes === 'error') {
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        Error
        <p className='pt-5'>No such Order Found try again later</p>
      </div>
    );
  }

  //****************************//
  //* response from order API  *//
  //****************************//
  return (
    <div className='py-2 border border-gray-600 shadow-md shadow-gray-800 rounded-xl flex space-y-8 xmd:space-y-0 flex-col xmd:flex-row xmd:space-x-5 px-2 text-gray-700 justify-center items-center'>
      {/* Book Cover Image based on bookID */}
      <div className='flex-grow flex justify-center xmd:basis-1/2'>
        <div className='rounded-2xl overflow-hidden w-[140px] h-[216px] md:w-[280px] md:h-[432px]'>
          <BookCover bookId={orderRes.bookId} />
        </div>
      </div>
      {editBox ? (
        //****************************//
        //* When editBox set to True *//
        //* Update Order section     *//
        //****************************//
        <div className='flex-grow space-y-3 border border-gray-600 shadow-md shadow-gray-800 rounded-3xl py-5 px-5 xmd:basis-1/2 min-w-[275px]'>
          <p>Book Id : &emsp;{orderRes.bookId}</p>
          <p>
            Order Id : <span className='text-xs'>&emsp;{orderRes.id}</span>
          </p>
          {/* ***************************************** */}
          {/* update function response != "updated      */}
          {/* Form to update username  else updated MSg */}
          {/* ***************************************** */}
          {updatedRes !== 'updated' ? (
            <div className='flex flex-col'>
              <label className='py-1 text-sm uppercase'>Consumer Name</label>
              <input
                className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'
                type='text'
                onChange={(e) => {
                  setConsumerName(e.target.value);
                }}
              />
            </div>
          ) : (
            <p className='text-center'>Order Updated</p>
          )}
          {/* ***************************************** */}
          {/* update function response != "updated      */}
          {/* button to update  else button to close    */}
          {/* ***************************************** */}
          <div className='flex justify-center py-5'>
            {updatedRes !== 'updated' ? (
              <button
                className='mx-auto rounded-lg text-gray-50 bg-green-600 p-2'
                onClick={() => {
                  updateOrder();
                }}
              >
                Update
              </button>
            ) : (
              <button
                className='mx-auto rounded-lg text-gray-50 bg-green-600 p-2'
                onClick={() => {
                  getOrder();
                  setEditBox(false);
                  setUpdatedRes(undefined);
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        //*****************************//
        //* When editBox set to false *//
        //* Display order details     *//
        //*****************************//
        <div className='flex-grow space-y-3 border border-gray-600 shadow-md shadow-gray-800 rounded-3xl py-5 px-5 xmd:basis-1/2 min-w-[275px]'>
          <p>Book Id : &emsp;{orderRes.bookId}</p>
          <p>
            Order Id : <span className='text-xs'>&emsp;{orderRes.id}</span>
          </p>
          <p>Customer Name : &emsp;{orderRes.customerName}</p>
          <p>Quantity : &emsp;{orderRes.quantity}</p>
          <p>
            Ordered At : &emsp;{new Date(orderRes.timestamp).toDateString()}
          </p>
          {/* On click set editBox to true */}
          <div className='flex justify-center py-5'>
            <button
              className='mx-auto rounded-lg text-gray-50 bg-green-600 p-2'
              onClick={() => {
                setEditBox(true);
              }}
            >
              Update Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
