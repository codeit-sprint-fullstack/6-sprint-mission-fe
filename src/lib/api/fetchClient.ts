const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 전역 accessToken 저장
let accessToken: any = null;

// accessToken 설정 함수 (최초 로그인 시 호출 필요)
export const setAccessToken = (token: any) => {
  accessToken = token;
};

// 내부 공통 fetch 로직 (401 → refresh 재시도 포함)
const fetchWithAutoRefresh = async (url: any, options = {}) => {
  let response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
    cache: "no-store",
  });

  // accessToken이 만료된 경우 (401)
  if (response.status === 401) {
    const refreshRes = await fetch(`${BASE_URL}/token/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      accessToken = data.accessToken;

      // 원래 요청 재시도
      response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        cache: "no-store",
      });
    } else {
      // 재발급 실패 → 지금은 logout 처리 생략
      throw new Error("토큰 재발급 실패. 다시 로그인 필요.");
    }
  }

  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : {};

  if (!response.ok) {
    const message = data?.message || `API error: ${response.status}`;
    throw new Error(message);
  }

  return data;
};

// 일반 fetch (로그인 등)
export const defaultFetch = async (url: any, options = {}) => {
  return fetchWithAutoRefresh(url, options);
};

// 토큰 기반 fetch
export const tokenFetch = async (
  url: any,
  tokenOverride: any,
  options = {}
) => {
  if (tokenOverride) {
    setAccessToken(tokenOverride);
  }
  return fetchWithAutoRefresh(url, options);
};
