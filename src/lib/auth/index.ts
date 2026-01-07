/**
 * Clerk Authentication Configuration
 * 
 * This module will contain Clerk authentication utilities and configuration.
 * 
 * Setup Instructions:
 * 1. Install Clerk: npm install @clerk/nextjs
 * 2. Add environment variables to .env.local:
 *    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
 *    - CLERK_SECRET_KEY=sk_xxx
 *    - NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 *    - NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 *    - NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
 *    - NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
 * 3. Wrap your app with ClerkProvider in layout.tsx
 * 4. Add middleware.ts for protected routes
 */

export const AUTH_CONFIG = {
  signInUrl: '/sign-in',
  signUpUrl: '/sign-up',
  afterSignInUrl: '/',
  afterSignUpUrl: '/',
};

// Placeholder for Clerk utilities
// export { auth, currentUser } from '@clerk/nextjs/server';
