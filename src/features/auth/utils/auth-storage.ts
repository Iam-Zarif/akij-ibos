import { AUTH_STORAGE_KEY } from "@/features/auth/constants/auth-storage";
import type { MockUser } from "@/features/auth/types/auth.types";

export function readStoredAuthUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as MockUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function writeStoredAuthUser(user: MockUser | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}
