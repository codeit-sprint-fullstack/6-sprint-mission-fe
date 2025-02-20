// ** need to add export at the bottom of functions export {func1, func2, etc }
import axios from 'axios';
// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`.
const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/articles',
});

async function getArticleList( params = {}) {
  const response = await instance.get('/', { params }); // already in JSON
  return response.data;
}

// getArticle(): Use the GET method.
async function getArticle(id) {
  const response = await instance.get(`/${id}`); 
  return response.data;
}
// createArticle(): Use the POST method.
async function createArticle(article) {
  const response = await instance.post('/', article);
  console.log(response.data)
  return response.data;
}
// Include `title`, `content`, and `image` in the request body.

// patchArticle(): Use the PATCH method.

// deleteArticle(): Use the DELETE method.

// Use fetch or axios for making requests.
// If the response status code is not 2XX, log the error message to the console.

// Use .then() for handling asynchronous processing.

// Use .catch() for error handling.

export { getArticle, getArticleList, createArticle };