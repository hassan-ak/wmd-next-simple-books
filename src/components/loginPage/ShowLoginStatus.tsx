//**********************************//
//* Component to show Login-Status *//
//* When user Login                *//
//**********************************//
import useSWR from 'swr';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser, setUser } from '@/slices/userSlice';

export default function ShowLoginStatus() {
  // Get base URL to be used in Fetch request
  const baseUrl = process.env.BASE_URL;

  //*********************************//
  //* Fetch User Deatils from Store *//
  //*********************************//
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  //**********************************************************//
  //* SWR request to check if user logged in with correct id *//
  //* Requet sent to orderhandler due to CROS error          *//
  //* random var for updating key for each request           *//
  //**********************************************************//
  const url = `${baseUrl}/api/ordersHandler`;
  const fetcher = (url: string) =>
    fetch(url, { headers: { Authorization: 'Bearer ' + user } }).then((res) =>
      res.json()
    );
  const random = React.useRef(Date.now());
  const {
    data,
    error,
    isLoading = true,
  } = useSWR([url, random], ([url, token]) => fetcher(url));

  //************************//
  //* When Data is loading *//
  //************************//
  if (isLoading) {
    return (
      <div>
        <p className='text-center'>Wait ...</p>
        <p className='font-semibold mt-10 px-5 text-center'>Loading ...</p>
      </div>
    );
  }

  //**************************************//
  //* If id is incorrect or server error *//
  //**************************************//
  if (error || data === 'error') {
    return (
      <div>
        <p className='text-center'>Error</p>
        <p className='font-semibold my-10 px-5 text-center'>
          User ID is incorrect
        </p>
        <div className='flex justify-center'>
          <button
            className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
            onClick={() => {
              // Set user Id to empty string in store
              dispatch(setUser(''));
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  //*****************************//
  //* When ID matches on server *//
  //*****************************//
  return (
    <div>
      <p className='text-center'>You are logged in with user-ID:</p>
      <p className='font-semibold text-xs my-10 px-5 text-center'>
        {user.slice(0, 25)}...
      </p>
      <div className='flex justify-center'>
        <button
          className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
          onClick={() => {
            // Set user Id to empty string in store
            dispatch(setUser(''));
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
