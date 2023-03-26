//**********************//
//* Orders Handler APi *//
//**********************//

//**********************************//
//* Function to get orders details *//
//* Send a Get request             *//
//* need token in header           *//
//**********************************//
async function getOrder(token: string | null, id: string | null) {
  if (token) {
    const res = await fetch(`https://simple-books-api.glitch.me/orders/${id}`, {
      method: 'GET',
      headers: { Authorization: token },
      cache: 'no-store',
    });
    if (!res.ok) {
      return 'error';
    }
    return res.json();
  }
}

//******************************//
//* API to handle GET request  *//
//* for getting order details  *//
//******************************//
export async function GET(request: Request) {
  let result = await getOrder(
    request.headers.get('authorization'),
    request.headers.get('id')
  );
  return new Response(JSON.stringify(result));
}
