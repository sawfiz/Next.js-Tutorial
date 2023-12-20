// middleware.ts
// export the default function of the imported module
export {default} from 'next-auth/middleware'

// Protected routes
export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  // matcher: ['/dashboard/:path*']
  matcher: ['/users/:id*']
}