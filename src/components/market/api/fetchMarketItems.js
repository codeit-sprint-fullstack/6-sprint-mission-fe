// src/api/fetchMarketItems.js
export const fetchMarketItems = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/items?page=${page}&pageSize=${pageSize}&orderBy=recent`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data.list; // ✅ 서버 응답 형식이 { list: [...] } 일 경우
  } catch (error) {
    console.error("상품 목록을 가져오는 데 실패했습니다:", error);
    return [];
  }
};
