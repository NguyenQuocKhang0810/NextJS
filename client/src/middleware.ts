import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/", "/me", "/products/new"];
const publicPaths = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  if (privatePaths.includes(pathname) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (publicPaths.includes(pathname) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/me", "/login", "/register", "/products/new"],
};
