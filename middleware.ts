import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routes } from './lib/constants';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  const accessingAdminRoute = routes.admin.some((r) => pathname.startsWith(r));
  const accessingCustomerRoute = routes.customer.some((r) =>
    pathname.startsWith(r)
  );
  const accessingProtectedRoute = accessingAdminRoute || accessingCustomerRoute;

  if (!token && accessingProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  if (token) {
    const role = token.role;
    if (accessingAdminRoute && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
