import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ 쿠키 기반 인증을 위해 꼭 필요!
});

export default axiosInstance;
