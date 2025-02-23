export { getArticleList, getArticle, createArticle, patchArticle, deleteArticle };

const ArticleService_URL = 'https://sprint-mission-api.vercel.app/articles';

// Get article list
function getArticleList({ page, pageSize, keyword }) {
  const url = new URL(ArticleService_URL);
  return fetch(`${url}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then(res => {
      console.log(`Status: ${res.status} - Article list fetched successfully.`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Get a single article
function getArticle(articleId) {
  return fetch(`${ArticleService_URL}/${articleId}`)
    .then(res => {
      console.log(`Status: ${res.status} - Article fetched successfully.`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Create an article
function createArticle({ title, content, tags }) {
  return fetch(ArticleService_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, tags }),
  })
    .then(res => {
      console.log(`Status: ${res.status} - Article created successfully.`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Update an article
function patchArticle(articleId, data) {
  return fetch(`${ArticleService_URL}/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => {
      console.log(`Status: ${res.status} - Article updated successfully.`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Delete an article
function deleteArticle(articleId, password) {
  return fetch(`${ArticleService_URL}/${articleId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
    .then(res => {
      console.log(`Status: ${res.status} - Article deleted successfully.`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      handleError(error);
    });
}

// Error handler function
function handleError(error) {
  console.error('Request failed', error);
}
