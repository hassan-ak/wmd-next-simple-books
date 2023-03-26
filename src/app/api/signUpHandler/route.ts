//**********************//
//* SignUp Handler APi *//
//**********************//

//*******************************//
//* Function to SignUp new User *//
//* Send a post request         *//
//* need name and email in body *//
//* Return user ID              *//
//*******************************//
async function signUp(
  body: { clientName: string; clientEmail: string } | null
) {
  console.log(body);
  if (body) {
    const res = await fetch(`https://simple-books-api.glitch.me/api-clients/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

//******************************//
//* API to handle post request *//
//* for Signing UP             *//
//******************************//
export async function POST(request: Request) {
  let body = await request.json();
  let result = await signUp(body);
  return new Response(JSON.stringify(result));
}
