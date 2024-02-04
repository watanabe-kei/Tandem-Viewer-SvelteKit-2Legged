export function getAccessToken() {
  return fetch("/api/auth/token").then((res) => res.json());
}