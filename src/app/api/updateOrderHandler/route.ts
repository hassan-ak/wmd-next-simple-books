//****************************//
//* Update Order Handler APi *//
//****************************//

//*******************************//
//* Function to update an order *//
//* Send a PATCH request        *//
//*******************************//
async function updateOrder(
  token: string | null,
  id: string | null,
  consumerName: string | null
) {
  if (token && id && consumerName) {
    const res = await fetch(`https://simple-books-api.glitch.me/orders/${id}`, {
      method: 'PATCH',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: consumerName }),
      cache: 'no-store',
    });
    if (!res.ok) {
      return 'error';
    }
    return 'updated';
  }
}

//*******************************//
//* API to handle PATCH request *//
//* for updating an order       *//
//*******************************//
export async function PATCH(request: Request) {
  let result = await updateOrder(
    request.headers.get('authorization'),
    request.headers.get('id'),
    request.headers.get('consumername')
  );
  return new Response(JSON.stringify(result));
}
