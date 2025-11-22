const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken =
        typeof window !== "undefined"
          ? localStorage.getItem("refreshToken")
          : null;

      if (!refreshToken) return null;

      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshRes.ok) return null;

      const refreshData = await refreshRes.json();
      const newAccessToken = refreshData?.data?.accessToken ?? null;
      if (!newAccessToken) return null;

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", newAccessToken);
      }
      return newAccessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function apiRequest(endpoint, options = {}) {
  const { method = "GET", queryParams, body, binary = false, token } = options;

  const queryString = queryParams
    ? "?" + new URLSearchParams(queryParams).toString()
    : "";
  const url = `${BASE_URL}${endpoint}${queryString}`;

  let authToken =
    token ||
    (typeof window !== "undefined"
      ? localStorage.getItem("authToken") ?? undefined
      : undefined);

  const doFetch = async (currentToken) => {
    const isFormData = body instanceof FormData;

    return fetch(url, {
      method,
      headers: {
        Accept: binary ? "application/octet-stream" : "application/json",
        ...(isFormData
          ? {}
          : {
              "Content-Type": binary
                ? "application/octet-stream"
                : "application/json",
            }),
        ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      },
      body:
        method !== "GET"
          ? isFormData
            ? body
            : binary
            ? body
            : JSON.stringify(body ?? {})
          : undefined,
    });
  };

  let response = await doFetch(authToken);

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
      handleAuthRedirect();
      throw new Error("Session expired. Please log in again.");
    }
    response = await doFetch(newToken);
  }

  if (binary) {
    const blob = await response.blob();
    return blob;
  }

  if (!response.ok) {
    let body = null;
    body = await response.json();
    throw body;
  }

  if (response.status === 204) return {};

  try {
    let data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function handleAuthRedirect() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
    } catch {}
    window.location.replace(`/login`);
  }
  throw new Error("Auth required");
}

export { apiRequest };
