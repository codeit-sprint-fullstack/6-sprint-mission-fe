const base_URL = "http://localhost:3000";

//access Token을 포함한 클라이언트
export const tokenFetch = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

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

  //디버깅
  console.log("options", options);
  console.log("mergedOptions", mergedOptions);

  const response = await fetch(`${base_URL}${url}`, mergedOptions);

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
