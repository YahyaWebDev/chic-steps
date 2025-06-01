import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes (optional)
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req)) return; // Skip auth for public routes
  auth().protect(); // Enforce auth for protected routes
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
