import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  login_redirect,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthPrefix) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(login_redirect, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth//login", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
