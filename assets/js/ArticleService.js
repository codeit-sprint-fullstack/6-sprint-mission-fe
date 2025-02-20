// ** need to add export at the bottom of functions export {func1, func2, etc }
import axios from 'axios';

// Create axios instance
const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/articles',
});

// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`. => ** in main.js?
async function getArticleList(keyword = "", page = 1, pageSize = 100) {
  const params = { keyword, page, pageSize };
  const response = await instance.get('/', { params });
  return response.data
}

// getArticle(): Use the GET method.
async function getArticle(id) {
  const response = await instance.get(`/${id}`); 
  return response.data;
}
// createArticle(): Use the POST method.
// Include `title`, `content`, and `image` in the request body => in main.js
async function createArticle(article) {
  const response = await instance.post('/', article);
  return response.data;
}

// patchArticle(): Use the PATCH method.
// async function patchArticle() {

// }

// deleteArticle(): Use the DELETE method.

// Use fetch or axios for making requests.
// If the response status code is not 2XX, log the error message to the console.

// Use .then() for handling asynchronous processing.

// Use .catch() for error handling.

export { getArticle, getArticleList, createArticle };