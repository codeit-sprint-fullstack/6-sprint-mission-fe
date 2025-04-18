const API_BASE_URL = "http://localhost:3001";

const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `API Error: ${response.status} ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
    throw error;
  }
};

export const createArticle = (articleData) => {
  return fetchApi("/articles", {
    method: "POST",
    body: JSON.stringify(articleData),
  });
};

export const getArticle = (articleId) => {
  return fetchApi(`/articles/${articleId}`);
};

export const updateArticle = (articleId, articleData) => {
  return fetchApi(`/articles/${articleId}`, {
    method: "PATCH",
    body: JSON.stringify(articleData),
  });
};

export const deleteArticle = (articleId) => {
  return fetchApi(`/articles/${articleId}`, {
    method: "DELETE",
  });
};

export const getArticles = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchApi(`/articles?${query}`);
};

export const createArticleComment = (articleId, commentData) => {
  return fetchApi(`/articles/${articleId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

export const getArticleComments = (articleId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchApi(`/articles/${articleId}/comments?${query}`);
};

export const updateComment = (commentId, commentData) => {
  return fetchApi(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(commentData),
  });
};

export const deleteComment = (commentId) => {
  return fetchApi(`/comments/${commentId}`, {
    method: "DELETE",
  });
};

export const createProduct = (productData) => {
  return fetchApi("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
};

export const getProduct = (productId) => {
  return fetchApi(`/products/${productId}`);
};

export const updateProduct = (productId, productData) => {
  return fetchApi(`/products/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = (productId) => {
  return fetchApi(`/products/${productId}`, {
    method: "DELETE",
  });
};

export const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchApi(`/products?${query}`);
};

export const createProductComment = (productId, commentData) => {
  return fetchApi(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
};

export const getProductComments = (productId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchApi(`/products/${productId}/comments?${query}`);
};
