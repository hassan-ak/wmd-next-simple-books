'use client';

//***********************//
//* Login / SignUp page *//
//***********************//
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser, setUser } from '@/slices/userSlice';
import LoginForm from '../../components/loginPage/LoginForm';
import ShowLoginStatus from '../../components/loginPage/ShowLoginStatus';

//****************** *//
//* Type Definations *//
//****************** *//
// Response from signup request
interface SignUpDetails {
  accessToken: string;
}
type SignUpResponse = SignUpDetails | 'error' | undefined;

//********//
//* Page *//
//********//
export default function Login() {
  // Get base URL to be used in Fetch request
  const baseUrl = process.env.BASE_URL;

  //*****************************************************//
  //* Get userID and dispatch function from redux store *//
  //* user ID saved by default is ''                    *//
  //*****************************************************//
  const user = useSelector(selectedUser);
  const dispatch = useDispatch();

  //****************************************//
  //* State Management of different values *//
  //****************************************//
  const [formType, setFormType] = useState(true); // true for signup form and false for login form
  const [signingUp, setSigningUp] = useState(false); // true when request sent for signing up else false
  const [signUpResponse, setSignUpResponse] = useState<SignUpResponse>(); // Signup request response undefined by default, error or actual response
  const [userName, setUserName] = useState('-'); // User name to update on chnage in input field
  const [userEmail, setUserEmail] = useState('-'); // User email to update on chnage in input field

  //********************************//
  //* Functon to send post request *//
  //* request to signup            *//
  //***** **************************//
  function signUp() {
    fetch(`${baseUrl}/api/signUpHandler`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: userName,
        clientEmail: userEmail,
      }),
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => setSignUpResponse(data))
      .catch(() => setSignUpResponse('error'));
  }

  //*************************//
  //* Signup button handler *//
  //*************************//
  async function signUpHandle() {
    setSigningUp(true);
    signUp();
    setUserName('');
    setUserEmail('');
  }

  return (
    <div className='flex flex-col pb-5'>
      {/* ********** */}
      {/* Page title */}
      {/* ********** */}
      <h1 className='text-center font-bold text-2xl pb-12'>Login / SignUp</h1>
      {user === '' ? (
        //****************************************************//
        //* When user Id Not saved process Sigin/SignUp form *//
        //****************************************************//
        <div className='flex justify-center items-center'>
          {!formType ? (
            //********************************************//
            //* Login Form when formType is set to false *//
            //********************************************//
            <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
              <LoginForm></LoginForm>
              {/* Message below form to switch to signup form*/}
              <p className='pt-5'>
                If you are not signed-up proceed to{' '}
                <span
                  className='font-semibold text-lg hover:cursor-pointer'
                  onClick={() => {
                    setFormType(true);
                  }}
                >
                  Sign-up
                </span>
              </p>
            </div>
          ) : //
          //*************************************//
          //* Form when formType is set to true *//
          //*************************************//
          !signingUp ? (
            //*************************************************************************//
            //* SignUp Form when formType is set to true and signingUp check is false *//
            //*************************************************************************//
            <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
              <div>
                <div className='flex flex-col'>
                  <label className='py-1 text-sm uppercase'>Name</label>
                  <input
                    className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div className='flex flex-col'>
                  <label className='py-1 text-sm uppercase'>Email</label>
                  <input
                    className='flex rounded-lg border-2 border-gray-300 p-2 text-gray-700'
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
                    onClick={() => {
                      signUpHandle();
                    }}
                  >
                    SignUp
                  </button>
                </div>
              </div>
              {/* text below form to switch to login form */}
              <p className='pt-5'>
                If you have already signed-up proceed to{' '}
                <span
                  className='font-semibold text-lg hover:cursor-pointer'
                  onClick={() => {
                    setFormType(false);
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          ) : //
          //*****************************************************************//
          //* Display SignUp Response when formType,signingUp check is true *//
          //*****************************************************************//
          !signUpResponse ? (
            //*******************************************************//
            //* When there is no SignUp response / Response Loading *//
            //*******************************************************//
            <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
              <p className='text-center'>Wait ...</p>
              <p className='font-semibold mt-10 px-5 text-center'>
                Loading ...
              </p>
            </div>
          ) : //
          //*****************************************//
          //* When there is error response from API *//
          //*****************************************//
          signUpResponse === 'error' ? (
            <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
              <p className='text-center'>Error</p>
              <p className='font-semibold mt-10 px-5 text-center'>
                User Already Registered
              </p>
              <p className='mt-5 text-xs'>
                Try to signUp with different Name and Email
              </p>
              <div className='flex justify-center'>
                <button
                  className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
                  onClick={() => {
                    setSigningUp(false);
                    setSignUpResponse(undefined);
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            //***********************************//
            //* When there is response from API *//
            //***********************************//
            <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72'>
              <p className='text-center'>SignUp Successfull</p>
              <p className='font-semibold mt-10 px-5 text-center'>
                Your Login Id is :
              </p>
              <p className='break-all w-full my-5 text-xs'>
                {signUpResponse.accessToken}
              </p>
              <p>
                Save your id for future login. Click below button to continue
              </p>
              <div className='flex justify-center'>
                <button
                  className='w-fill mt-4 rounded-lg bg-teal-300 p-2 text-center text-gray-700'
                  onClick={() => {
                    dispatch(setUser(signUpResponse.accessToken));
                    setSignUpResponse(undefined);
                    setSigningUp(false);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        //***********************************//
        //* Show Login Status when ID Saved *//
        //***********************************//
        <div className='flex justify-center items-center'>
          <div className='border border-gray-600 shadow-md shadow-gray-800 rounded-xl p-5 w-72 truncate'>
            <ShowLoginStatus />
          </div>
        </div>
      )}
    </div>
  );
}
