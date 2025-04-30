// TODO: 내가 만든 API 연결하려면 그냥 API 주소만 변경하면 된다.
// (대신, API 경로 잘 봐서 내가 다르게 만든거 있으면 경로 수정은 필요.)
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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

  let res = await fetch(`${BASE_URL}${url}`, mergedOptions);

  // 토큰 만료 시(새 토큰 요청)
  if (res.status === 401 && typeof window !== "undefined") {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const { accessToken } = await refreshRes.json();

        localStorage.setItem("accessToken", accessToken);

        mergedOptions.headers.Authorization = `Bearer ${accessToken}`;

        return await fetch(`${BASE_URL}${url}`, mergedOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("토큰 갱신에 실패하였습니다.");
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const data = await res.json();

  if (!accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  return data;
};
