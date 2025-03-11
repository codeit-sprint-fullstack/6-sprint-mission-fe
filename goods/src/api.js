export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${query}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    const body = await response.json();
    return body;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
