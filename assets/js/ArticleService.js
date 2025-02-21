// ** need to add export at the bottom of functions export {func1, func2, etc }
import axios from 'axios';

// Create axios instance
const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/articles',
});

// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`. 
async function getArticleList(keyword = '', page = 1, pageSize = 100) {
  const params = { keyword, page, pageSize };
  return instance.get('/', { params }) // returns Promise
  // Check HTTP status code range 200-299 - successful
    .then(response => {
      if (response.status >= 200 && response.status < 300){
        console.log('게시글 목록 조회 결과 리스트:', response.data);
        return response.data;
      } else {
        throw response;
      }
    }) // chaining, so don't use comma
    // handle network errors
    .catch((error) => {
      console.error('게시글 목록 조회 오류 발생:', error);
      if (error.response) { 
        // HTTP response is true (non 2xx responses handled in this block
        console.error('HTTPS 에러:', error.response.status, error.response.data);
      } else if (error.request) { 
        // request error handling
        console.error('Request 에러:', error.request);
      } else {
        console.error('Setup 에러:', error.message);
      } 
    });
}

// getArticle(): Use the GET method.
async function getArticle(id) {
  return instance.get(`/${id}`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(`요청한 게시글 ${id}번 조회 결과:`, response.data);
        return response.data;
      } else { 
        throw response;
      }
    })
    .catch((error) => {
      console.error('게시글 상세 조회 오류 발생:', error);
      if (error.response) { 
        console.error('HTTPS 에러, 게시글을 찾을 수 없음:', error.response.status, error.response.data);
      } else if (error.request) { 
        console.error('Request 에러:', error.request);
      } else {
        console.error('Setup 에러:', error.message);
      } 
    });
}
// createArticle(): Use the POST method.
// Include `title`, `content`, and `image` in the request body => in main.js
async function createArticle(article) {
  return instance.post('/', article)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log('게시글 작성 완료:', response.data);
        return response.data;
      } else {
        throw response;
      }
    })
    .catch((error) => {
      console.error('게시글 등록 오류 발생:', error);
      if (error.response) { 
        console.error('HTTPS 에러, 게시글을 찾을 수 없음:', error.response.status, error.response.data);
      } else if (error.request) { 
        console.error('Request 에러:', error.request);
      } else {
        console.error('Setup 에러:', error.message);
      } 
    });
}

// patchArticle(): Use the PATCH method.
async function patchArticle(id, patchContent) {
  // patch request body patchContent should have  {title,content,image}
  return instance.patch(`/${id}`, patchContent)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log('게시글 수정 완료:', response.data);
        return response.data;
      } else {
        throw response;
      }
    })
    .catch((error) => {
      console.error('게시글 수정 오류 발생:', error);
      if (error.response) {
      // HTTPS error handling
        console.error('HTTPS 에러, 게시글을 찾을 수 없음:', error.response.status, error.response.data);
      } else if (error.request) { 
        console.error('Request 에러:', error.request);
      } else {
        console.error('Setup 에러:', error.message);
      } 
    });
}

// deleteArticle(): Use the DELETE method.

// Use fetch or axios for making requests.
// If the response status code is not 2XX, log the error message to the console.

// Use .then() for handling asynchronous processing.

// Use .catch() for error handling.

export { getArticle, getArticleList, createArticle, patchArticle };