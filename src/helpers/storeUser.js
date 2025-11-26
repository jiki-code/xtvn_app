export function getUserProfile() {
  if (typeof window === "undefined") return null;
  try {
    const s = window.localStorage.getItem("user_profile");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}