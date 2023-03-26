//**********************//
//* delete Handler APi *//
//**********************//

//*******************************//
//* Function to delte an order  *//
//* Send a delte request        *//
//* need token                  *//
//*******************************//
async function deleteOrder(token: string | null, id: string | null) {
  if (token && id) {
    const res = await fetch(`https://simple-books-api.glitch.me/orders/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
      cache: 'no-store',
    });
    if (!res.ok) {
      return 'error';
    }
    return 'deleted';
  }
}

//********************************//
//* API to handle DELETE request *//
//* for deleteing an order       *//
//********************************//
export async function DELETE(request: Request) {
  const res = await deleteOrder(
    request.headers.get('authorization'),
    request.headers.get('id')
  );
  return new Response(JSON.stringify(res));
}
