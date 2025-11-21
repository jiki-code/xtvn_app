import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
 const url = request.nextUrl;

  // // Nếu vào homepage "/" → chuyển sang "/auth"
  // if (url.pathname === "/") {
  //   url.pathname = "/auth";
  //   return NextResponse.redirect(url);
  // }
  // Skip internal and special routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/unsupported") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") || "";

  // Example: Block mobile devices
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);

  if (isMobile) {
    const url = new URL("/unsupported", request.url);
    return NextResponse.rewrite(url); // or: NextResponse.redirect(url)
  }

  // If valid device → continue to page
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // apply to all routes
};
