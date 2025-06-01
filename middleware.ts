import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Add your protected routes here
  '/profile(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth().protect({
      // Use Clerk's hosted domain for sign-in
      fallbackRedirectUrl: 'https://natural-bluebird-84.clerk.accounts.dev',
      
      // Optional: Return to the original page after sign-in
      returnBackUrl: req.url
    });
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
