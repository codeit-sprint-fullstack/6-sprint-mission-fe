const baseUrl = "https://panda-market-api.vercel.app/products";

export const getProducts = async (
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword
) => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", pageSize);
    url.searchParams.append("orderBy", orderBy);
    if (keyword) {
      url.searchParams.append("keyword", keyword);
    }
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
