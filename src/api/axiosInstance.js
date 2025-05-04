import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 토큰 자동 주입
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 추가: 401 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 정상일 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 오류 발생 시, Access Token이 만료된 경우
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 요청을 중복해서 보내지 않도록 플래그 설정

      try {
        // Refresh Token을 이용해서 새로운 Access Token을 발급받음
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const response = await axios.post("/auth/refresh-token", { refreshToken });

          // 새로운 Access Token을 localStorage에 저장
          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);

          // 기존 요청을 새로운 Access Token으로 재시도
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(originalRequest); // 재시도된 요청을 반환
        } else {
          // Refresh Token도 없으면 로그인 페이지로 리다이렉트
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (err) {
        // Refresh Token 요청 실패 시 로그인 페이지로 리다이렉트
        console.error("Refresh Token Error", err);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // 401 외의 오류는 그대로 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
