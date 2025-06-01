import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  debug: true, // Optional: Logs Clerk middleware activity
  skipCookieCheck: process.env.NODE_ENV === 'development' // Disables cookie checks in dev
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
