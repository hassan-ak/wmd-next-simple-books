//***************************//
//* Place order Handler APi *//
//***************************//

//*******************************//
//* Function to place new Order *//
//* Send a post request         *//
//* require id and name in body *//
//* need id as auth token       *//
//* return order ID             *//
//*******************************//
async function placeOrder(
  body: { bookId: string; customerName: string } | null,
  token: string | null
) {
  if (body && token) {
    const res = await fetch(`https://simple-books-api.glitch.me//orders`, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    if (!res.ok) {
      return 'error';
    }
    return res.json();
  }
  return 'error';
}

//*******************************//
//* API to handle post request  *//
//* for placing order           *//
//*******************************//
export async function POST(request: Request) {
  let body = await request.json();
  let token = request.headers.get('authorization');
  let result = await placeOrder(body, token);
  return new Response(JSON.stringify(result));
}
