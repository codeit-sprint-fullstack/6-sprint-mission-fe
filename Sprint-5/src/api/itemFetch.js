import axios from "axios";

const BASE_URL = 'https://panda-market-api.vercel.app';

const ItemFetch = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { page, pageSize, orderBy, keyword },
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    return { totalCount: 0, list: [] };
  }
};

export default ItemFetch;
