import { tokenFetch } from "./fetchClient";

const formDataFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");

  const defaultOptions = {
    credentials: "include",
    cache: "no-store",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  try {
    return await response.json();
  } catch (e) {
    return { status: response.status, ok: response.ok };
  }
};

export const userService = {
  getMe: () => tokenFetch("/users/me"),

  updateMe: (formData) =>
    formDataFetch("/users/me", {
      method: "PATCH",
      body: formData,
    }),

  updatePassword: (passwordData) =>
    tokenFetch("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
    }),

  getMyProducts: () => tokenFetch("/users/me/products"),

  getMyFavorites: () => tokenFetch("/users/me/favorites"),
};
