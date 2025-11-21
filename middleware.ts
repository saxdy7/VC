import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware without auth check to avoid Edge runtime issues
// Auth protection is handled in the page components via server-side checks
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/room/:path*", "/dashboard/:path*"],
}
