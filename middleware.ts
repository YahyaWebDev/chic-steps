// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
  // Public routes - no authentication required
  const publicRoutes = ['/', '/api/webhook'];
  
  if (!publicRoutes.includes(req.nextUrl.pathname)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
