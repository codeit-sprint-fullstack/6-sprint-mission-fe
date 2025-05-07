import { BASE_URL } from "@/const";
import { getServerSideToken, setServerSideTokens } from "@/lib/actions/auth";

/**
 * accessToken을 쿠키에 저장하는 함수
 * @param {string} accessToken - JWT 액세스 토큰
 */
export function setTokensToCookie(accessToken, refreshToken) {
  if (typeof window === "undefined") {
    return setServerSideTokens(accessToken, refreshToken);
  }

  const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));
  const refreshTokenData = JSON.parse(atob(refreshToken.split(".")[1]));

  const accessTokenExpiresIn =
    accessTokenData.exp - Math.floor(Date.now() / 1000);
  const refreshTokenExpiresIn =
    refreshTokenData.exp - Math.floor(Date.now() / 1000);

  document.cookie = `accessToken=${accessToken}; path=/; max-age=${accessTokenExpiresIn}; SameSite=Strict`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${refreshTokenExpiresIn}; SameSite=Strict`;
}

export async function getTokenFromCookie(type = "accessToken") {
  if (typeof document === "undefined") {
    return getServerSideToken(type);
  }

  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${type}=`)
  );
  return tokenCookie ? tokenCookie.trim().split("=")[1] : null;
}

/**
 * 사용자가 인증되었는지 확인하는 함수
 * @returns {boolean} 인증 여부
 */
export function isAuthenticated() {
  return !!getTokenFromCookie();
}

// 클라이언트에서 refreshToken 꺼내는 함수
export async function refreshAccessTokenClient() {
  const cookies = document.cookie.split(";").reduce((acc, cur) => {
    const [key, value] = cur.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});

  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    throw new Error("refreshToken 없음");
  }

  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "토큰 갱신 실패");
  }

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}
