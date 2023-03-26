//**************//
//* Login Form *//
//**************//
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/userSlice';

export default function LoginForm() {
  //******************************************//
  //* Get dispatch function from redux store *//
  //* To be used for updating userID         *//
  //******************************************//
  const dispatch = useDispatch();

  //****************************************//
  //* State Management of different values *//
  //****************************************//
  const [userId, setUserId] = useState(''); // user id to be updated onchange for unput field

  return (
    //************************//
    //* Ligin form component *//
    //************************//
    <div>
      <div className='flex flex-col'>
        <label className='py-1 text-sm uppercase'>User ID</label>
        <input
          className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'
          type='text'
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
      </div>
      <div className='flex justify-center'>
        <button
          className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
          onClick={() => {
            dispatch(setUser(userId));
            setUserId('');
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
