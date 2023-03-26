//**********************//
//* Orders Handler APi *//
//**********************//

//**********************************//
//* Function to get List of Orders *//
//* Send a Get request             *//
//* need token in header           *//
//**********************************//
async function getOrders(token: string | null) {
  if (token) {
    const res = await fetch('https://simple-books-api.glitch.me/orders', {
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
//* for getting list of orders *//
//******************************//
export async function GET(request: Request) {
  let result = await getOrders(request.headers.get('authorization'));
  return new Response(JSON.stringify(result));
}
