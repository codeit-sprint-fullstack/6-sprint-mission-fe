const BASE_URL = process.env.NEXT_PUBLIC_CODEIT_API_BASE_URL;

export const tokenFetch = async (url, options = {}) => {
  let accessToken;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const defaultOpions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };

  const mergedOptions = {
    ...defaultOpions,
    ...options,
    headers: {
      ...defaultOpions.headers,
      ...options.headers,
    },
  };

  const res = await fetch(`${BASE_URL}${url}`, mergedOptions);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const data = await res.json();

  if (!accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  return data;
};
