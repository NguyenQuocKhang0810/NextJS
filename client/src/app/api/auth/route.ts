export async function POST(request: Request) {
  const res = await request.json();
  console.log("res", res);

  const sessionToken = res?.data?.token;

  if (!sessionToken) {
    return new Response(
      JSON.stringify({ message: "Session token not received" }),
      {
        status: 400,
      }
    );
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly` },
    // Cookie vẫn được gửi đến server trong mọi request (vì Path=/), nhưng client-side không thể "nhìn thấy" hoặc "đọc" nó (vì HttpOnly).
    // Server vẫn nhận được cookie bình thường qua header Cookie.
  });
}
