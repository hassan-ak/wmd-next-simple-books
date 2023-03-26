//******************//
//* List all order *//
//******************//
import React from 'react';
import OrdersList from '../../components/orders/OrdersList';

//***************//
//* Orders Page *//
//***************//
export default async function books() {
  return (
    <div className='flex flex-col pb-5'>
      {/* Page title */}
      <h1 className='text-center font-bold text-2xl pb-12'>Placed Orders</h1>
      <div className='flex justify-center'>
        <OrdersList />
      </div>
    </div>
  );
}
