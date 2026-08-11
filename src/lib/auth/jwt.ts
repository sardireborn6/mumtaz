import { SignJWT, jwtVerify } from "jose";

// File ini SENGAJA tidak mengimpor next/headers atau next/navigation — dipakai
// juga oleh src/proxy.ts yang berjalan di runtime terbatas (mirip Edge), jadi
// harus tetap ringan & portable (cuma jose, tidak ada Node-only API).

export const SESSION_COOKIE_NAME = "mm_admin_session";

export type SessionPayload = {
  username: string;
  expiresAt: string;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET belum diset — isi di .env.local.");
  }
  return new TextEncoder().encode(secret);
}

export async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
