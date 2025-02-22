import axios from 'axios'

const BASE_URL = 'https://panda-market-api-crud.vercel.app';

// const getArticleList = (page, pageSize, keyword) => {
//   console.log("함수실행중")
//   const res = BASE_URL + "/articles"
//     return axios.get(res, {
//     params: { page: page, pageSize: pageSize, keyword: keyword }
//   })
//   .then(response => {
//     console.log(response.data);
//     return response.data;
//   })
//   .catch(error => {
//     console.log(error.response.status)
//     console.log(error.response.data)
//   })
// }
// getArticleList();

const getArticle = (id) => {
  console.log("함수실행중")
  const res = BASE_URL + `/articles/${id}`;
    return axios.get(res)
  .then(response => {
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    console.log(error.response.status)
    // console.log(error.response.data)
  })
}
getArticle();