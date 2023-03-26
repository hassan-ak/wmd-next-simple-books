//*********************//
//* Single Order Page *//
//*********************//
import SingleOrder from '../../../components/orders/SingleOrder';

export default function Order({ params }: { params: { order: string } }) {
  return (
    <div className='flex flex-col pb-5'>
      {/* Page title */}
      <h1 className='text-center font-bold text-2xl pb-12'>Order Details</h1>
      <div className='flex justify-center'>
        <SingleOrder orderId={params.order} />
      </div>
    </div>
  );
}
