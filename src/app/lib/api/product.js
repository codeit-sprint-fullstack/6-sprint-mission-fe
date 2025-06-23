const API_URL = "http://localhost:4000";

export async function getTitle(id) {
  try {
    const productId = id;
    const response = await fetch(`${API_URL}/products/${productId}`);
    const data = response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

export async function addProduct({product}) {
  try{
    const {name,description,price}
    const response
  }
}
