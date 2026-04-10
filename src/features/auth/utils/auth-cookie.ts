import type { MockUser } from "@/features/auth/types/auth.types";

const AUTH_COOKIE_KEY = "akij_access_token";
const AUTH_USER_COOKIE_KEY = "akij_active_user";

export function readAuthToken() {
  if (typeof document === "undefined") {
    return "";
  }

  const tokenCookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${AUTH_COOKIE_KEY}=`));

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1] || "") : "";
}

export function writeAuthToken(token: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function readAuthUser() {
  if (typeof document === "undefined") {
    return null;
  }

  const userCookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${AUTH_USER_COOKIE_KEY}=`));

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(
      decodeURIComponent(userCookie.split("=")[1] || ""),
    ) as MockUser;
  } catch {
    return null;
  }
}

export function writeAuthUser(user: MockUser) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_USER_COOKIE_KEY}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearAuthToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
  document.cookie = `${AUTH_USER_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
