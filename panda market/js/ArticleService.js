import axios from 'axios'

export const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';

export const getArticleList = (page, pageSize, keyword) => {
  console.log("함수실행중")
  const res = BASE_URL;
    return axios.get(res, {
    params: {
      page: page,
      pageSize: pageSize,
      keyword: keyword
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error("오류 발생:", error.response ? error.response.data : error.message);
    })
}

export const getArticle = (id) => {
  console.log("함수실행중")
  const res = `BASE_URL/${id}`;
    return axios.get(res)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error("오류 발생:", error.response ? error.response.data : error.message);
    })
}

export const createArticle = (title, content, image) => {
  console.log("함수실행중중")
  const res = BASE_URL;
  const articleData = {
    title: title,
    content: content,
    image: `https://${image}`
    };
    return axios.post(res, articleData)
      .then(response => {
        console.log("응답 데이터", response.data)
        return response.data;
      })
      .catch(error => {
        console.error("오류 발생:", error.response ? error.response.data : error.message);
        return null;
      });
}

export const patchArticle = (id, title, content, image) => {
  const res = `${BASE_URL}/${id}`;
  const articleData = {
    title: title,
    content: content,
    image: `https://${image}`
  };
  return axios.patch(res, articleData)
    .then(response => {
      console.log("응답 데이터", response.data)
      return response.data;
    })
    .catch(error => {
      console.error("오류 발생:", error.response ? error.response.data : error.message);
    })

}

export const deleteArticle = (id) => {
  const res = `${BASE_URL}/${id}`;
  return axios.delete(res)
   .then(response => {
    console.log("응답 데이터", response.data)
    return response.data;
   })
   .catch(error => {
    console.error("오류 발생:", error.response ? error.response.data : error.message);
   })
}

