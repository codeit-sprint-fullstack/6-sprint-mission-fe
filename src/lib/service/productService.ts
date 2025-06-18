import { BASE_URL } from "@/constant";
import { Product, ProductParams } from "@/types";
import { toQueryString } from "../utils/query";
import { getProductAction } from "../actions/product";

export const productService = {
  getProducts: async (params: ProductParams) => {
    const query = toQueryString(params);

    try {
      const res = await fetch(`${BASE_URL}/products?${query}`);
      if (!res.ok) throw new Error("상품 목록을 불러오는데 실패했습니다.");
      return await res.json();
    } catch (e) {
      console.error("상품 목록을 불러오는데 실패했습니다.", e);
      throw e;
    }
  },
  getProduct: async (productId: number): Promise<Product> => {
    return await getProductAction(productId);
  },
};
