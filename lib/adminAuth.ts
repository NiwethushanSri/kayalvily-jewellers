// Designed and Developed by Forge9x Ltd
// Sign-in for /admin. There is one password, set as ADMIN_PASSWORD in the hosting settings (never in code).
// A successful sign-in sets a signed cookie that lasts a week; changing the password signs everyone out.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "kj_admin";
const WEEK_SECONDS = 7 * 24 * 60 * 60;

const password = () => process.env.ADMIN_PASSWORD ?? "";

// The admin stays switched off until a password of at least 10 characters is set.
export const adminConfigured = () => password().length >= 10;

const sha = (text: string) => createHash("sha256").update(text).digest();
const sign = (expires: string) => createHmac("sha256", sha(`kayalvily-admin:${password()}`)).update(expires).digest("hex");

export function passwordMatches(input: string) {
  // Comparing hashes keeps the check the same length and the same time whatever was typed.
  return adminConfigured() && timingSafeEqual(sha(input), sha(password()));
}

export async function startSession() {
  const expires = String(Date.now() + WEEK_SECONDS * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: WEEK_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const [expires, signature] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  if (!expires || !signature || !(Number(expires) > Date.now())) return false;
  const good = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return given.length === good.length && timingSafeEqual(given, good);
}
