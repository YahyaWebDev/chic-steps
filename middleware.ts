import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/profile(.*)'
]);

export default clerkMiddleware(async (auth, req) => {  // Note the async
  if (isProtectedRoute(req)) {
    const { userId } = await auth();  // Await the auth promise
    if (!userId) {
      return new Response('Unauthorized', { 
        status: 307,
        headers: { 
          Location: 'https://natural-bluebird-84.clerk.accounts.dev' 
        }
      });
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
