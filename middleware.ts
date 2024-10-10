// middleware.ts
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const JWT_SECRET = 'link_sharing_app';

// Define protected routes (add more as needed)

export function middleware(req: NextRequest) {
  console.log('middleware', req);

  // Get the Authorization header (Bearer token)
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Redirect to login page if no token found
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // Allow request to proceed if token is valid
  } catch (error) {
    console.error('Invalid token:', error);
    // Redirect to login if token is invalid or expired
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard', '/profile', '/settings'], // Define the routes to protect
};
