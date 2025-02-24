import axios from 'axios'

const url =  'https://sprint-mission-api.vercel.app/articles'

export function getArticleList(page, pageSize, keyword){
  return axios.get(url, {params: {page, pageSize, keyword}})
  .then(res => res.data)
  .catch(e =>{
    if(e.response){
      console.log(e.response.status)
      console.log(e.response.data)
    }else{
      console.log("리퀘스트 실패")
    }
  })
}

export function getArticle(id) {
  return axios.get(`${url}/${id}`)
    .then(res => res.data)  
    .catch(e => {
      if(e.response){
        console.log(e.response.status)
        console.log(e.response.data)
      }else{
        console.log("리퀘스트 실패")
      }
    });
}


export function createArticle(title, content, image) {
  return axios.post(url, { title, content, image })
  .then(res => res.data)  
    .catch(e => {
      if(e.response){
        console.log(e.response.status)
        console.log(e.response.data)
      }else{
        console.log("리퀘스트 실패")
      }
    });
}

export function patchArticle(id, updatedData) {
  return axios.patch(`${url}/${id}`, updatedData)
    .then(res => res.data) 
    .catch(e => {
      if(e.response){
        console.log(e.response.status)
        console.log(e.response.data)
      }else{
        console.log("리퀘스트 실패")
      }
    });
}


export function deleteArticle(id) {
  return axios.delete(`${url}/${id}`)
    .then(res => res.data)  
    .catch(e => {
      if(e.response){
        console.log(e.response.status)
        console.log(e.response.data)
      }else{
        console.log("리퀘스트 실패")
      }
    });
}