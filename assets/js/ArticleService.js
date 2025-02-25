import axios from 'axios';

// Create axios instance
const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/articles',
});

// error handling function
function handleError(error, customMessage) {
  console.error(customMessage, error);
  if (error.response) {
    console.error('HTTPS 에러:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('Request 에러:', error.request);
  } else {
    console.error('Setup 에러:', error.message);
  }
}

// getArticleList(): Use the GET method.
// Use query parameters `page`, `pageSize`, `keyword`. 
async function getArticleList(page = 1, pageSize = 100, keyword = '') {
  const params = { page, pageSize, keyword };
  return instance.get('/', { params }) // returns Promise
    .then(response => {
      if (response.status >= 200 && response.status < 300){
        console.log('게시글 목록 조회 결과 리스트:', response.data);
        return response.data;
      } else {
        throw response;
      }
    }) // chaining, so don't use comma
    // handle network errors
    .catch((error) => handleError(error, '게시글 목록 조회 오류 발생:'));
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
    .catch((error) => handleError(error, '게시글 목록 조회 오류 발생:'));
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
    .catch((error) => handleError(error, '게시글 등록 오류 발생:'));
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
    .catch((error) => handleError(error, '게시글 수정 오류 발생:'));
}

// deleteArticle(): Use the DELETE method.
async function deleteArticle(id) {
  return instance.delete(`/${id}`)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(`요청한 게시글 ${id}번 삭제 완료:`, response.data);
        return response.data;
      } else { 
        throw response;
      }
    })
    .catch((error) => handleError(error, '게시글 삭제 오류 발생:'));
  }
export { getArticle, getArticleList, createArticle, patchArticle, deleteArticle };