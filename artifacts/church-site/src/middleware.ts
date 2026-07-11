import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshes the session so it stays alive; IMPORTANT: do not remove.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Helper: build a redirect that carries any refreshed session cookies forward
  function redirectWithCookies(pathname: string) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies
      .getAll()
      .forEach(({ name, value, ...rest }) =>
        redirectResponse.cookies.set(name, value, rest),
      );
    return redirectResponse;
  }

  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !user) {
    return redirectWithCookies('/admin/login');
  }

  if (request.nextUrl.pathname === '/admin/login' && user) {
    return redirectWithCookies('/admin/dashboard');
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*'],
};
