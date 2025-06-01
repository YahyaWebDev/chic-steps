import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes (optional)
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  // Protect routes
  if (isProtectedRoute(req)) {
    auth().protect({
      fallbackRedirectUrl: 'natural-bluebird-84.clerk.accounts.dev', // Redirect to sign-in if not authenticated
    });
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
