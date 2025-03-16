const BASE_URL = "https://panda-market-api.onrender.com/products";

export const handleError = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const body = await res.json();
    return body;
  } catch (e) {
    console.error("Failed to fetch products:", e);
    throw e;
  }
};

export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}?${query}`;
  return handleError(url);
};

export const addProduct = () => {
  const url = BASE_URL;
  return handleError(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: String,
      description: String,
      price: Number,
      tags: Array[String],
      images: Array[String],
    },
  });
};

export const getProduct = (id) => {
  const url = `${BASE_URL}/${id}`;
  return handleError(url);
};

export const updateProduct = (id) => {
  const url = `${BASE_URL}/${id}`;
  return handleError(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: String,
      description: String,
      price: Number,
      tags: Array[String],
      images: Array[String],
    },
  });
};

export const deleteProduct = (id) => {
  const url = `${BASE_URL}/${id}`;
  return handleError(url, {
    method: "DELETE",
  });
};
