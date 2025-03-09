export const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 전체 상품 목록
export async function getProductList({ page, pageSize, sort, search }) {
  try {
    // URL 매개변수 설정
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (pageSize) params.append("pageSize", pageSize);
    if (sort) params.append("sort", sort);
    if (search) params.append("search", search);

    const url = `${BASE_URL}/products?${params}`;
    console.log("API 요청 URL:", url);

    // API 호출
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `서버 응답 오류: ${response.status} ${response.statusText}`
      );
    }

    // 서버 응답 데이터 확인
    const data = await response.json();
    console.log("API 응답 데이터:", data);

    // 상품 목록 파싱
    const productsData = data.list || data.data || data.products || [];
    return {
      productsData,
      totalCount: data.total || productsData.length,
    };
  } catch (error) {
    console.error("API 요청 오류:", error);
    return { productsData: [], totalCount: 0 };
  }
}

// 베스트 상품 목록 API 호출
export async function getBestProducts() {
  try {
    const url = `${BASE_URL}/products?sort=favorite`;
    console.log("API 요청 URL:", url);

    // API 호출
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("베스트 상품 목록을 불러오는 데 실패했습니다.");
    }

    // 서버 응답 데이터 확인
    const data = await response.json();
    console.log("베스트 상품 데이터:", data);

    // 상품 목록 파싱
    return Array.isArray(data.list) ? data.list : data.products || [];
  } catch (error) {
    console.error("베스트 상품 API 요청 오류:", error);
    return [];
  }
}
