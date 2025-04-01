import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "fr"]; // Danh sách locale được hỗ trợ
const defaultLocale = "en"; // Locale mặc định

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra nếu URL đã có locale (ví dụ: /en/products)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return; // Nếu đã có locale, không làm gì

  // Lấy tiêu đề Accept-Language từ request
  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
  };
  const languages = new Negotiator({ headers }).languages();
  const matchedLocale = match(languages, locales, defaultLocale);

  // Chuyển hướng đến URL với locale (ví dụ: /en/products)
  request.nextUrl.pathname = `/${matchedLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Áp dụng cho tất cả route trừ API, static files
};
