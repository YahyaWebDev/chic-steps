import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  ignoredRoutes: ['/api/some-route'], // Routes that won't trigger auth checks
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
