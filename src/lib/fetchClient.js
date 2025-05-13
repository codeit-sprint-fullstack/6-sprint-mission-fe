import { authService } from "./authService";

const base_URL = "http://localhost:3000";

async function refreshAccessToken() {
  const res = await fetch(`${base_URL / auth / refresh}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return false;

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);

  return true;
}

export const tokenDelete = async (url) => {
  localStorage.removeItem("accessToken");

  const res = await fetch(`${base_URL}${url}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res) return res.json({ message: "로그아웃할 수 없습니다." });

  return res
    .status(204)
    .json({ message: "No content, 토큰이 삭제되었습니다." });
};

//access Token을 포함한 클라이언트
export const tokenFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
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

  let response = await fetch(`${base_URL}${url}`, mergedOptions);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      authService.logout();
      return;
    }
  }

  accessToken = localStorage.getItem("accessToken");
  response = await fetch(`${base_URL}${url}`, mergedOptions);

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();

  // // 응답 본문이 있는지 확인
  // const contentType = response.headers.get("content-type");
  // if (contentType && contentType.includes("application/json")) {
  //   return response.json();
  // }

  // // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  // return { status: response.status, ok: response.ok };
};
