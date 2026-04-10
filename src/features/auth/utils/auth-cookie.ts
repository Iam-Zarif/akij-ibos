const AUTH_COOKIE_KEY = "akij_access_token";

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

export function clearAuthToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}
