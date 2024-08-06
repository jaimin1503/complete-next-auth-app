import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const url = request.nextUrl.clone();

  console.log(`Token: ${token ? "exists" : "does not exist"}`);
  console.log(`URL: ${url.pathname}`);

  if (token && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    console.log("Redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*"],
};
