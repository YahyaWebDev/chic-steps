import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  skipCookieCheck: true // Skip in all environments
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
