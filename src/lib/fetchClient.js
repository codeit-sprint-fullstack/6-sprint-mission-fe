// src/lib/fetchClient.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authUtils = {
  setAuthTokens: (accessToken, refreshToken) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("accessToken", accessToken);

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          localStorage.removeItem("refreshToken");
        }
      } catch (error) {
        console.error("로컬 스토리지에 토큰 저장 실패:", error);
      }
    }
  },
  getAccessToken: () => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("accessToken");
      } catch (error) {
        console.error("로컬 스토리지에서 액세스 토큰 읽기 실패:", error);
        return null;
      }
    }
    return null;
  },
  getRefreshToken: () => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("refreshToken");
      } catch (error) {
        console.error("로컬 스토리지에서 리프레시 토큰 읽기 실패:", error);
        return null;
      }
    }
    return null;
  },
  clearAuthTokens: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } catch (error) {
        console.error("로컬 스토리지에서 토큰 삭제 실패:", error);
      }
    }
  },
};

const handleResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  let data;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("JSON 응답 파싱 실패:", error, "받은 텍스트:", text);

    if (!response.ok) {
      throw new Error(
        `API 오류: ${response.status} ${response.statusText}. 응답 본문이 유효한 JSON이 아닙니다.`
      );
    }

    console.warn("API 응답 상태는 성공이나 JSON 파싱 실패. text:", text);
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error ||
      `API 오류: ${response.status} ${response.statusText}`;
    console.error("API 오류 발생:", errorMessage, {
      status: response.status,
      data,
    });

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const refreshAccessToken = async () => {
  const refreshToken = authUtils.getRefreshToken();
  if (!refreshToken) {
    console.warn("[refreshAccessToken] 리프레시 토큰이 없어 토큰 갱신 불가.");

    return null;
  }

  try {
    console.log("[refreshAccessToken] 액세스 토큰 갱신 시도...");

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await handleResponse(response);

    if (refreshData && refreshData.accessToken) {
      console.log("[refreshAccessToken] 새 액세스 토큰 발급 성공.");

      authUtils.setAuthTokens(
        refreshData.accessToken,
        refreshData.refreshToken || refreshToken
      );
      return refreshData.accessToken;
    } else {
      console.error(
        "[refreshAccessToken] 갱신 응답에 액세스 토큰 없음:",
        refreshData
      );
      throw new Error("토큰 갱신 응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    console.error("[refreshAccessToken] 토큰 갱신 중 오류 발생:", error);

    if (error.status === 401) {
      console.warn(
        "[refreshAccessToken] 리프레시 토큰 만료 또는 무효. 로그아웃 처리."
      );
      authUtils.clearAuthTokens();
    }

    authUtils.clearAuthTokens();

    throw new Error("토큰 갱신에 실패했습니다. 다시 로그인해주세요.");
  }
};

const fetchWithAuth = async (endpoint, options = {}, isFormData = false) => {
  let accessToken = authUtils.getAccessToken();
  const url = `${API_BASE_URL}${endpoint}`;

  if (!accessToken) {
    console.warn(
      `[fetchWithAuth] 액세스 토큰 없음. 리프레시 시도... (요청: ${endpoint})`
    );
    try {
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        throw new Error(
          "인증 토큰이 없고 갱신에도 실패했습니다. 로그인이 필요합니다."
        );
      }
      console.log(
        `[fetchWithAuth] 토큰 갱신 성공 후 요청 재개 (요청: ${endpoint})`
      );
    } catch (refreshError) {
      console.error(
        `[fetchWithAuth] 초기 토큰 갱신 실패 (요청: ${endpoint}):`,
        refreshError
      );

      throw refreshError;
    }
  }

  const makeRequest = async (token) => {
    const headers = {
      ...(!isFormData && { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    let processedBody = options.body;

    if (!isFormData && processedBody && typeof processedBody === "object") {
      try {
        processedBody = JSON.stringify(processedBody);
        console.debug("[fetchWithAuth] Body를 JSON으로 변환:", processedBody);
      } catch (stringifyError) {
        console.error("[fetchWithAuth] JSON.stringify 실패:", stringifyError);
        throw new Error("요청 데이터를 JSON으로 변환하는 데 실패했습니다.");
      }
    }
    // --------------------------------------

    const config = {
      ...options,
      headers,
      body: processedBody,
    };

    const logOptions = isFormData
      ? { ...config, body: "FormData<hidden>" }
      : config;
    console.debug(
      `[fetchWithAuth] API 요청 시도: ${options.method || "GET"} ${url}`,
      logOptions
    );

    return fetch(url, config);
  };

  try {
    const response = await makeRequest(accessToken);

    if (response.status === 401) {
      console.warn(
        `[fetchWithAuth] 401 Unauthorized 수신. 토큰 갱신 시도... (요청: ${endpoint})`
      );

      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        throw new Error("토큰 갱신에 실패하여 요청을 완료할 수 없습니다.");
      }

      console.log(
        `[fetchWithAuth] 새 토큰으로 재요청 시도... (요청: ${endpoint})`
      );
      const retryResponse = await makeRequest(newAccessToken);

      return handleResponse(retryResponse);
    } else {
      return handleResponse(response);
    }
  } catch (error) {
    console.error(
      `[fetchWithAuth] API 호출 실패 (요청: ${endpoint}):`,
      error.message,
      { status: error.status, data: error.data }
    );

    throw error;
  }
};

export const defaultPandaFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  let processedBody = options.body;

  if (
    processedBody &&
    typeof processedBody === "object" &&
    !(processedBody instanceof FormData)
  ) {
    try {
      processedBody = JSON.stringify(processedBody);
    } catch (stringifyError) {
      console.error("[defaultPandaFetch] JSON.stringify 실패:", stringifyError);
      throw new Error("요청 데이터를 JSON으로 변환하는 데 실패했습니다.");
    }
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: processedBody,
  };

  try {
    console.debug(
      `[defaultPandaFetch] API 요청 시도: ${options.method || "GET"} ${url}`,
      config
    );
    const response = await fetch(url, config);
    return handleResponse(response);
  } catch (error) {
    console.error(`[defaultPandaFetch] API 호출 실패: ${error.message}`, {
      url,
      options,
    });
    throw error;
  }
};
export const cookiePandaFetch = (endpoint, options = {}) => {
  return fetchWithAuth(endpoint, options, false);
};

export const formDataPandaFetch = (endpoint, options = {}) => {
  if (options.body && !(options.body instanceof FormData)) {
    console.warn(
      "[formDataPandaFetch] Body가 FormData 타입이 아닙니다. FormData를 사용하고 있는지 확인하세요."
    );
  }

  return fetchWithAuth(endpoint, options, true);
};
