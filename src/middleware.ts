/**
 * Middleware Configuration
 * 
 * This middleware will be used to protect routes with Clerk authentication.
 * 
 * Implementation (after installing @clerk/nextjs):
 * 
 * import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 * 
 * const isPublicRoute = createRouteMatcher([
 *   '/',
 *   '/sign-in(.*)',
 *   '/sign-up(.*)',
 *   '/api/public(.*)',
 * ]);
 * 
 * export default clerkMiddleware((auth, request) => {
 *   if (!isPublicRoute(request)) {
 *     auth().protect();
 *   }
 * });
 * 
 * export const config = {
 *   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
 * };
 */

// Placeholder middleware - replace with Clerk middleware after installation
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Placeholder: Add Clerk authentication here
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
