import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  skipCookieCheck: process.env.NODE_ENV !== 'production'
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
