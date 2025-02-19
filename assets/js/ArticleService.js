// need to add export at the bottom of functions export {func1, func2, etc }
import axios from 'axios';
// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`.
async function getArticleList( params = {}) {
  const url = new URL('https://panda-market-api-crud.vercel.app/articles');
  const instance = axios.create({
    baseURL: 'https://panda-market-api-crud.vercel.app',
  });

  const response = await instance.get(
    '/articles', 
    { params }
  ); // already in JSON
  return response.data;
}
// console.log(await getArticleList({page: 1}));
// async function getArticle() {

// }

// getArticle(): Use the GET method.

// createArticle(): Use the POST method.
// Include `title`, `content`, and `image` in the request body.

// patchArticle(): Use the PATCH method.

// deleteArticle(): Use the DELETE method.

// Use fetch or axios for making requests.
// If the response status code is not 2XX, log the error message to the console.

// Use .then() for handling asynchronous processing.

// Use .catch() for error handling.