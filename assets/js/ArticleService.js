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
        console.log('Here is the article list requested:', response.data);// *
        return response.data;
      } else {
        throw new Error();
      }
    }) // chaining, so don't use comma
    // handle network errors
    .catch((error) => {
      console.error('게시글 리스트 조회 오류', error);
    });
}

// getArticle(): Use the GET method.
async function getArticle(id) {
  return instance.get(`/${id}`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(`Requested article ${id}:`, response.data);// *
        return response.data;
      } else { // ** change it to else if 404 and add else block
        throw new Error();
      }
    })
    .catch((error) => {
      console.error('게시글을 찾을 수 없음', error.response.status);// ** need to fix this
    });
}
// createArticle(): Use the POST method.
// Include `title`, `content`, and `image` in the request body => in main.js
async function createArticle(article) {
  return instance.post('/', article)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log('Created an article:', response.data); //*
        return response.data;
      } else {
        throw new Error();
      }
    })
    .catch((error) => {
      console.error('유효성 검사 오류:',error.response.status);
    });
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