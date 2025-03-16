const BASE_URL = "https://panda-market-api.vercel.app/products"; // API URL

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "createdAt",
  keyword = "",
}) => {
  const offset = (page - 1) * pageSize;
  const params = new URLSearchParams({
    offset,
    limit: pageSize,
    order: orderBy,
  });

  if (keyword.trim() !== "") {
    params.append("search", keyword);
  }

  const requestUrl = `https://panda-market-api.vercel.app/products?${params.toString()}`;
  console.log("📡 Fetching products from:", requestUrl);

  try {
    const res = await fetch(requestUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const json = await res.json();
    console.log("✅ API Response:", json);

    return json || {};
  } catch (error) {
    console.error("❌ API fetch error:", error);
    return {};
  }
};
