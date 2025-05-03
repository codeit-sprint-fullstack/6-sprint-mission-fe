import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://panda-market-api.vercel.app", // ✅ 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
