import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  debug: process.env.NODE_ENV === 'development',
  skipCookieCheck: true // Disables cookie domain validation
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
