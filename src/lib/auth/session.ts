import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encryptSession, decryptSession, SESSION_COOKIE_NAME } from "@/lib/auth/jwt";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

export { decryptSession, SESSION_COOKIE_NAME };

export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await encryptSession({ username, expiresAt: expiresAt.toISOString() });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Data Access Layer: dipanggil di tiap halaman & Server Action admin untuk
 * verifikasi sesi. Redirect ke /admin/login kalau tidak valid — jadi setiap
 * pemanggil otomatis terlindungi tanpa perlu cek manual berulang-ulang.
 */
export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSession(token);

  if (!session?.username) {
    redirect("/admin/login");
  }

  return { username: session.username };
}
