"use client";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

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

  // FormData 객체 여부 확인
  const isFormData = options.body instanceof FormData;

  const defaultOptions = {
    headers: {
      // FormData일 경우 Content-Type 헤더를 설정하지 않음 (브라우저가 자동으로 설정)
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(accessToken && {
        Authorization: `${accessToken}`,
      }),
    },
    cache: "no-store",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      // options.headers에 특별히 Content-Type이 지정되어 있으면 그것을 사용
      // FormData일 경우 Content-Type을 설정하지 않음
      ...(!isFormData && options.headers),
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    // 응답 본문을 가져오려고 시도
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API 에러: ${response.status}`);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `API 에러: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`API 에러: ${response.status} - ${error.message}`);
    }
  }

  // 응답이 JSON인지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return { status: response.status, ok: response.ok };
};
