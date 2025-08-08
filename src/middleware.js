import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // The home page is public so users can see the login form.
  // The sso-callback is also public so social logins can work.
  publicRoutes: ["/", "/sso-callback"],
});

export const config = {
  // Protect all routes including api/trpc routes
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
