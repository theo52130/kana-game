import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Forcer le mode dynamique par en-tête
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: [
    /*
     * Correspond à toutes les routes d'application
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};