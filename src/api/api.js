const baseUrl = "https://panda-market-api.vercel.app/products";

export const getProducts = async (
  page,
  pageSize,
  keyword,
  orderBy = "recent"
) => {
  try {
    const url = new URL(baseUrl);
    if (page) url.searchParams.append("page", page);
    if (pageSize) url.searchParams.append("pageSize", pageSize);
    if (keyword) url.searchParams.append("keyword", keyword);
    url.searchParams.append("orderBy", orderBy);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(res.message);
    }
    const body = await res.json();
    return body;
  } catch (e) {
    console.error(e.message);
  }
};
