const baseURL = "https://panda-market-api.vercel.app";

export const defaultFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    // Next.js 기본 캐싱 활성화
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
    const errorData = await response.json();
    const error = new Error(errorData.message);
    error.status = response.status;
    throw error;
  }

  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json")
    ? response.json()
    : { status: response.status, ok: response.ok };
};

export const tokenFetch = async (url, options = {}) => {
  const token = localStorage.getItem("accessToken"); //

  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },

    cache: "no-store", // SSR/ISR시 매번 최신화
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

  // 401 에러 시 토큰 갱신 시도
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
          localStorage.setItem("accessToken", accessToken); //
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
  return contentType && contentType.includes("application/json")
    ? response.json()
    : { status: response.status, ok: response.ok };
};
export const cookieFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    credentials: "include", // 쿠키 인증 필수
    cache: "no-store", // SSR/ISR시 매번 최신화
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

  // 401 에러 시 토큰 갱신 시도
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
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json")
    ? response.json()
    : { status: response.status, ok: response.ok };
};
