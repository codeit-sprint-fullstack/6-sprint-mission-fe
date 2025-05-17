const API_URL = "http://localhost:4000";

export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}
