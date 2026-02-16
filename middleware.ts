import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Add cache control headers to prevent browser caching of locale-specific content
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
