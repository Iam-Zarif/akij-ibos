import type { AppUser, UserRole } from "@/features/auth/types/auth.types";

const AUTH_COOKIE_KEY = "akij_access_token";
const AUTH_USER_COOKIE_KEY = "akij_active_user";

function normalizeRole(role: string): UserRole {
  if (role === "developer") {
    return "candidate";
  }

  if (role === "recruiter" || role === "interviewer") {
    return "employer";
  }

  return role === "candidate" ? "candidate" : "employer";
}

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
    const user = JSON.parse(
      decodeURIComponent(userCookie.split("=")[1] || ""),
    ) as AppUser;

    return {
      ...user,
      role: normalizeRole(user.role),
    };
  } catch {
    return null;
  }
}

export function writeAuthUser(user: AppUser) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_USER_COOKIE_KEY}=${encodeURIComponent(JSON.stringify({ ...user, role: normalizeRole(user.role) }))}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearAuthToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
  document.cookie = `${AUTH_USER_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
