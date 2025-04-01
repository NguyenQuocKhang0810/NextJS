export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    },
  });
}
