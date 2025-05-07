"use client";

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

// 서버 클라이언트에선 로컬에 접속이 불가능함 그런데 클라이언트로 바꾸면

export const tokenFetch = async (url, options = {}) => {
  // 🔐 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
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

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
