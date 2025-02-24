import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/articles'
})

/**
 * 게시글 목록 조회
 * @param {number} page
 * @param {number} pageSize
 * @param {string} [keyword]
 */
export const getArticleList = async params => {
  return await instance.get('/', { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log(error.message);
      }
    })
}

/**
 * 게시글 상세 조회
 */
export const getArticle = async id => {
  return await instance.get(`/${id}`)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    if (error.response) {
      console.log(error.response.status, '게시글을 찾을 수 없음');
    } else {
      console.log(error.message);
    }
  })
}

/**
 * 게시글 등록
 */
export const createArticle = async data => {
  return await instance.post('/', data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    if (error.response) {
      console.log(error.response.status, '유효성 검사 오류');
    } else {
      console.log(error.message);
    }
  })
}

/**
 * 게시글 수정
 */
export const patchArticle = async (id, data) => {
  return await instance.patch(`/${id}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    if (error.response) {
      console.log(error.response.status, '게시글을 찾을 수 없음');
    } else {
      console.log(error.message);
    }
  })
}

/**
 * 게시글 삭제
 */
export const deleteArticle = async id => {
  return await instance.delete(`/${id}`)
  .then(response => {
    console.log(response.status, '성공적으로 삭제됨');
    return response.data;
  })
  .catch(error => {
    if (error.response) {
      console.log(error.response.status, '게시글을 찾을 수 없음');
    } else {
      console.log(error.message);
    }
  })
}