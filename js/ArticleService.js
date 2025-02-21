// axios 설정

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app',
  timeout: 5000,
});

// get 함수들

export function getArticleList(page, pageSize, keyword = '') {
  instance.get(`/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)

  .then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('GET List 함수 작동이 안 됨');
    }
   console.log(response.data);
   return response.data;
  })

  .catch((error) => {
    console.error(error.message);
  });
}

export function getArticle(id) {
  instance.get(`/articles/${id}`)

  .then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('GET 함수 작동이 안 됨');
    };
  console.log(response.data);
  return response.data;
  })

  .catch((error) => {
    console.error(error.message);
  })
}

// post, patch, delete 함수

export function createArticle(postData) {
  instance.post('/articles', postData)

  .then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('POST 함수 작동이 안 됨');
    }
  console.log(response.data);
  return response.data;
})

  .catch((error) => {
    console.error(error.message);
  })
}

export function patchArticle(id, patchData) {
  instance.patch(`/articles/${id}`, patchData)

  .then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('PATCH 함수 작동이 안 됨');
  }
  console.log(response.data);
  return response.data;
})

  .catch((error) => {
    console.error(error.message);
  })
}

export function deleteArticle(id) {
  instance.delete(`/articles/${id}`)

  .then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('DELETE 함수 작동이 안 됨.');
    }
    console.log(response.data);
    return response.data;
  })

  .catch((error) => {
    console.error(error.message);
  })
}