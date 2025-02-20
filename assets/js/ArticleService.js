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
  return instance.get('/', { params }) // returns Promise
  // handle HTTP error response
    .then(response => {
      if (response.status >= 200 && response.status < 300){
        console.log('Here is the article list requested:', response.data);
        return response.data;
      } else {
        const errorMsg = `HTTP error occurred: ${response.status}`;
        throw new Error(errorMsg);
      }
    }) // chaining, so don't use comma
    // handle network errors
    .catch((error) => {
      console.error('Non-HTTP error occurred:', error);
    });
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