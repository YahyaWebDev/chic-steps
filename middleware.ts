import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  debug: true, // Optional logging
  skipCookieCheck: process.env.NODE_ENV === 'development' // Skip in dev
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
