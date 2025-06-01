// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {
  // Public routes - no authentication required
  const publicRoutes = ['/', '/api/webhook'];
  
  if (!publicRoutes.includes(req.nextUrl.pathname)) {
    await auth().protect();  // Added 'await'
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trrc)(.*)'],
};
