import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const res_url = request.url.toLowerCase();
  return NextResponse.rewrite(res_url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
