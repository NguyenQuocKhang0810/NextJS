import { type NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  // Trả về phản hồi JSON
  return NextResponse.json({
    message: "Search API called successfully",
    query: query,
  });
}
