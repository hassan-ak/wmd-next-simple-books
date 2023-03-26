'use client';
//***************//
//* Orders List *//
//***************//

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectedUser } from '@/slices/userSlice';
import { BookCover } from '@/components/BookCover';
import React, { useEffect, useState } from 'react';

//********************//
//* Type Definarions *//
//********************//
// Type of single order
interface Order {
  id: string;
  bookId: number;
  customerName: string;
  createdBy: string;
  quantity: number;
  timestamp: number;
}
// Type of orders request response
type OrdersResponse = Order[] | 'error' | undefined;
export default function OrdersList() {
  // Get base URL to be used in Fetch request
  const baseUrl = process.env.BASE_URL;

  //*********************************//
  //* Fetch User Details from Store *//
  //*********************************//
  const user = useSelector(selectedUser);

  //********************//
  //* State Management *//
  //********************//
  const [ordersRes, setOrdersRes] = useState<OrdersResponse>();
  const [deleteRes, setDeleteRes] = useState<'deleted' | 'error' | undefined>(
    'deleted'
  );

  //******************************//
  //* Functon to get Orders List *//
  //* request to get Orders      *//
  //* accept auth token          *//
  //******************************//
  function getOrders() {
    fetch(`${baseUrl}/api/ordersHandler`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + user },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setOrdersRes(data))
      .catch(() => setOrdersRes('error'));
  }

  //**********************************//
  //* Functon to delete Order        *//
  //* accept auth token and order id *//
  //**********************************//
  function deleteOrder(id: string) {
    fetch(`${baseUrl}/api/deleteOrderHandler`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + user, ID: id },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setDeleteRes(data))
      .catch(() => setDeleteRes('error'))
      .finally(() => getOrders());
  }

  //***********************************//
  //* Call getOrders function on Load *//
  //***********************************//
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*************************//
  //* Delete Button Handler *//
  //*************************//
  function deleteButtonHandler(id: string) {
    setOrdersRes(undefined);
    setDeleteRes(undefined);
    deleteOrder(id);
  }

  //*****************************//
  //* When user ID is not saved *//
  //*****************************//
  if (user === '') {
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        Error
        <p className='pt-5'>Kindly check your login ID or try again later</p>
      </div>
    );
  }

  //*****************************//
  //* When user ID is not saved *//
  //*****************************//
  if (!ordersRes) {
    if (!deleteRes) {
      return (
        <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
          Deleting ...
        </div>
      );
    }
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        Loading ...
      </div>
    );
  }

  //*********************************//
  //* In case of error from the Api *//
  //*********************************//
  if (ordersRes === 'error') {
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        API Error
        <p className='pt-5'>Some error fetching Orders try again later</p>
      </div>
    );
  }

  //*******************************//
  //* In case of no orders placed *//
  //*******************************//
  if (ordersRes.length === 0) {
    return (
      <div className='p-5 text-center w-full border border-gray-600 shadow-md shadow-gray-800 rounded-xl'>
        Currently No orders placed
      </div>
    );
  }

  //**************************************//
  //* When Orders data recieved from API *//
  //**************************************//
  return (
    <div className='flex flex-col space-y-10 max-w-[700px] min-w-[300px] relative'>
      {ordersRes.map((order: Order) => (
        <div
          key={order.id}
          className='p-5 border border-gray-500 shadow-sm shadow-gray-700 rounded-xl'
        >
          <div className='flex flex-col xmd:flex-row justify-between items-center'>
            <div className='flex flex-grow space-y-5 flex-col xmd:w-[400px] xmd:flex-row xmd:space-x-5 xmd:space-y-0'>
              <div className='w-[70px] h-[108px] object-cover rounded-xl overflow-hidden mx-auto xmd:mx-1'>
                <BookCover bookId={order.bookId} />
              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex'>
                  <p>Ordered By :</p>
                  <p>&emsp;{order.customerName}</p>
                </div>
                <div className='flex'>
                  <p>Quantity&emsp;&ensp;:</p>
                  <p>&emsp;{order.quantity}</p>
                </div>
              </div>
            </div>
            {/* Details Button to navigate to details Page and Delete to delete an order*/}
            <div className='flex w-full justify-around xmd:mt-0 mt-5 xmd:flex-col xmd:justify-between xmd:space-y-10 xmd:w-auto'>
              <Link href={`./orders/${order.id}`}>
                <button className='p-1 w-[70px] rounded-lg text-gray-50 bg-green-600'>
                  Details
                </button>
              </Link>
              <button
                className='w-[70px] p-1 rounded-lg text-gray-50 bg-red-600'
                onClick={() => {
                  deleteButtonHandler(order.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
