/**
 * api 재사용 설정
 */
export const BASE_URL = "http://localhost:3002";

export default async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const mergedOptions = {
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  };

  const response = await fetch(url, mergedOptions);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "api 호출에 실패했습니다");
  return data;
}
