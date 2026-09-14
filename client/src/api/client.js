const BASE = import.meta.env.VITE_API_URL || "";

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:expired"));
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || "Unauthorized");
    err.status = 401;
    throw err;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || `Request failed: ${res.status}`);
    err.status = res.status;
    if (res.status === 409) {
      err.code = body.code;
      err.details = body.details;
    }
    throw err;
  }

  return res.json();
}
