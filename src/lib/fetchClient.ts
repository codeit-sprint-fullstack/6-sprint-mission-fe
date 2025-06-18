import { authService } from "./authService";

const base_URL = "http://localhost:3000";

async function refreshAccessToken(): Promise<boolean> {
  const res = await fetch(`${base_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return false;

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);

  return true;
}

export const tokenDelete = async (url: string) => {
  localStorage.removeItem("accessToken");

  const res = await fetch(`${base_URL}${url}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return { message: "로그아웃할 수 없습니다." };

  if (res.status === 204) {
    return { message: "No content, 토큰이 삭제되었습니다." };
  }

  return res.json();
};

//access Token을 포함한 클라이언트
export const tokenFetch = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  let accessToken = localStorage.getItem("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const defaultOptions: RequestInit = {
    headers,
    cache: "no-store",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...(defaultOptions.headers || {}),
      ...(options.headers || {}),
    },
  };

  let response = await fetch(`${base_URL}${url}`, mergedOptions);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      authService.logout();
      throw new Error("인증 실패: 로그아웃되었습니다.");
    }

    accessToken = localStorage.getItem("accessToken");

    const retryHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      retryHeaders["Authorization"] = `Bearer ${accessToken}`;
    }

    mergedOptions.headers = {
      ...retryHeaders,
      ...(options.headers ? (options.headers as Record<string, string>) : {}),
    };

    response = await fetch(`${base_URL}${url}`, mergedOptions);
  }

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
};
