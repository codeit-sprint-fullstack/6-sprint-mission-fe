const baseURL = "https://panda-market-api.vercel.app";
// const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 기본 fetch 클라이언트 - 토큰 인증이 필요 없는 일반 요청용
 * 토큰 유무로 수정하기
 */
export const defaultFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
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

  try {
    const response = await fetch(`${baseURL}${url}`, mergedOptions);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "fetch 요청에 실패했습니다");
    }

    return data;
  } catch (error) {
    console.error("fetch 요청 중 에러:", error.message);
    throw error;
  }
};

/**
 * 토큰 인증 fetch 클라이언트 - localStorage의 accessToken을 Authorization 헤더로 전달
 */
export const tokenFetch = async (url, options = {}) => {
  const baseURL = "https://panda-market-api.vercel.app";

  // 🔐 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`, // ✅ 토큰이 있을 때만 헤더에 포함
      }),
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

  // ❗ 401 → refreshToken으로 토큰 재발급 시도 (쿠키로 전송)
  if (response.status === 401 && url !== "/auth/token/refresh") {
    try {
      const refreshResponse = await fetch(`${baseURL}/auth/token/refresh`, {
        method: "POST",
        credentials: "include", // ✅ refreshToken은 쿠키로 전송
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const newData = await refreshResponse.json();
        const newAccessToken = newData.accessToken;

        // ✅ 새로운 accessToken 저장
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ Authorization 헤더 다시 설정해서 원래 요청 재시도
        const retryOptions = {
          ...mergedOptions,
          headers: {
            ...mergedOptions.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        response = await fetch(`${baseURL}${url}`, retryOptions);
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
