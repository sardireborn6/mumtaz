import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/auth/jwt";

// Pengganti middleware.ts (deprecated di Next 16, fungsinya sama — cuma
// nama file/export berubah). Ini cuma "optimistic check": redirect cepat
// berdasar cookie saja. Verifikasi sesungguhnya tetap dilakukan di tiap
// halaman/Server Action admin lewat verifySession() (lihat lib/auth/session.ts).
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSession(token);

  if (!session?.username) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
