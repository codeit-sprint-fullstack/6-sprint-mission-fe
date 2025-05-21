const baseURL = "http://localhost:5000";

export const defaultFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    cache: "no-store",
  }; // 캐시사용안함

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
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const defaultOptions = {
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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

  //  accessToken 만료된 경우 → refreshToken으로 갱신 시도
  if (response.status === 401 && url !== "/auth/refresh-token") {
    try {
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }), // ✅ refreshToken을 body에 포함
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);

          // ✅ 새 accessToken으로 헤더 갱신
          mergedOptions.headers.Authorization = `Bearer ${newAccessToken}`;

          // ✅ 원래 요청 재시도
          response = await fetch(`${baseURL}${url}`, mergedOptions);
        }
      } else {
        // refreshToken이 만료되었거나 유효하지 않음 → 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        throw new Error("리프레시 토큰 만료: 로그인 다시 하세요");
      }
    } catch (err) {
      console.error("토큰 갱신 실패:", err);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Unauthorized: redirecting to login");
    }
  }

  // 최종 응답 체크
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // ✅ 응답 바디가 비었을 수 있으니 안전하게 처리
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (isJson) {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  return null;
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
