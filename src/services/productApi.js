export async function getProduct(order = "createdAt", page = 1, pageSize = 1000, searchTerm = "") {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?sort=${order}&page=${page}&pageSize=${pageSize}`
  );
  const body = await response.json();
  return body;
}
