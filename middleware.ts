import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  authorizedParties: ['https://pizza-street.vercel.app'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
