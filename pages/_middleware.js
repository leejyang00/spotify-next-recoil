import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

  const url = req.nextUrl.clone()
  // console.log(url, 'URL in middleware')
  url.pathname = '/login'
  // console.log(url, '<- AFTER')
  
  
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  // console.log(token, "<- TOKEN middleware")

  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true...
  //  1) Its a request for next-auth session & provider fetching
  //  2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login if they don't have token AND are requesting
  // a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.rewrite(url)
  }
}
