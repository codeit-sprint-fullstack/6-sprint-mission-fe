// axios | .then | .catch 이용하기
import axios from "axios"

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
}

const baseURL = 'https://panda-market-api-crud.vercel.app/articles'
const instance = axios.create({ baseURL })

// 게시글 목록 조회 : GET
// default = page=1&pageSize=10&orderBy=recent
/* query string(optional) : 
    page 페이지 번호(integer),
    pageSize 페이지 당 게시글 수(integer),
    orderBy 정렬 기준(string : recent, like),
    keyword 검색 키워드(string) */
const getArticleList = params => {
  return instance.get('/', { params })
    .then(res => res.data)
    .catch(e => console.log(e.message))
}


// 게시글 상세 조회 : GET
// path(required) : id(integer)
const getArticle = id => {
  return instance.get(`/${id}`)
  .then(res => res.data)
  .catch(e => console.log(e.message))
}


// 게시글 등록 : POST
// body(required) : title(string), content(string), image(string)
const createArticle = body => {
  return instance.post('/', body)
  .then(res => res.data)
  .catch(e => console.log(e.message))
}


// 게시글 수정 : PATCH
/* path(required) : id(integer)
   body(required) : title(string), content(string), image(string)*/
const patchArticle = (id, body) => {
  return instance.patch(`/${id}`, body)
    .then(res => res.data)
    .catch(e => console.log(e.message))
}


// 게시글 삭제 : DELETE
// path(required) : id(integer)
const deleteArticle = id => {
  return instance.delete(`/${id}`)
    .then(res => res.data)
    .catch(e => console.log(e.message))
}