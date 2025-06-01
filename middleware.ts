// middleware.js
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/api/webhook'],
  // Add this to fix cookie issues:
  afterAuth(auth, req) {
    if (req.nextUrl.pathname === '/') return;
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
