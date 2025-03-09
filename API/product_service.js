// axios | async, await | try, catch 이용하기
import axios from 'axios'

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
}

const baseURL = 'https://panda-market-api-crud.vercel.app/products'
const instance = axios.create({ baseURL })

const handleError = async func => {
  try {
    return await func()
  } catch (e) {
    if (e.response) {
      console.log(e.response.status)
      console.log(e.response.data.message)
    } else {
      console.log('request failed')
    }
  }
}

// 상품 목록 조회 : GET
// default = page=1&pageSize=10&orderBy=recent
/* query string(optional) : 
    page 페이지 번호(integer),
    pageSize 페이지 당 게시글 수(integer),
    orderBy 정렬 기준(string : recent, favorite),
    keyword 검색 키워드(string) */
const getProductList = params => {
  return handleError(async () => {
    const res = await instance.get('/', { params })
    return res.data
  })
}


// 상품 상세 조회 : GET
// path(required) : id(integer)
const getProduct = id => {
  return handleError(async () => {
    const res = await instance.get(`/${id}`)
    return res.data
  })
}


// 상품 등록 : POST
/* body(required) : 
    name(string),
    description(string),
    price(integer),
    tags[ (string) ],
    images[ (string) ] */
const createProduct = async body => {
  const res = await instance.post('/', body)
  return res.data
}


// 상품 수정 : PATCH
// path(required) : id(integer)
/* body(required) : 
    name(string),
    description(string),
    price(integer),
    tags[ (string) ],
    images[ (string) ] */
const patchProduct = async (id, body) => {
  const res = await instance.patch(`/${id}`, body)
  return res.data
}


// 상품 삭제 : DELETE
// path(required) : id(integer)
const deleteProduct = async id => {
  const res = await instance.delete(`${id}`)
  return res.data
}