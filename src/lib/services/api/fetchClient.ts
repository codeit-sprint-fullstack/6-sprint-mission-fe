const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const defaultFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    cache: "force-cache",
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
    const contentType = response.headers.get("content-type");
    let errorData;
    if (contentType && contentType.includes("application/json")) {
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
        console.error("Error parsing error response as JSON:", e, "Response:", errorData);
      }
    } else {
      errorData = await response.text();
      console.error("Non-JSON error response:", errorData);
    }
    throw new Error(JSON.stringify(errorData));
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      const data = await response.json();
      return {
        status: response.status,
        ok: response.ok,
        ...data,
      };
    } catch (e) {
      const textData = await response.text();
      console.error("Error parsing successful response as JSON:", e, "Response:", textData);
      return {
        status: response.status,
        ok: response.ok,
        data: textData, 
      };
    }
  }

  return {
    status: response.status,
    ok: response.ok,
  };
};

export const cookieFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    credentials: "include",
    cache: "no-store",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401 && url !== "/auth/token/refresh") {
    try {
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        response = await fetch(`${baseURL}${url}`, mergedOptions);
      }
    } catch (err) {
      console.error("토큰 갱신 실패:", err);
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return {
      status: response.status,
      ok: response.ok,
      ...data,
    };
  }

  return {
    status: response.status,
    ok: response.ok,
  };
};


export const tokenFetch = async (url, options = {}) => {
  const token = localStorage.getItem("accessToken");

  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-store",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401 && url !== "/auth/refresh-token") {
    try {
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const { accessToken } = await refreshResponse.json();
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        response = await fetch(`${baseURL}${url}`, mergedOptions);
      }
    } catch (err) {
      console.error("토큰 갱신 실패:", err);
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      throw new Error("Unauthorized: redirecting to login");
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return {
      status: response.status,
      ok: response.ok,
      ...data,
    };
  }

  return {
    status: response.status,
    ok: response.ok,
  };
};

