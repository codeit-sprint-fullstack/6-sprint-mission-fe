//fetch, .then()메서드/비동기처리, .catch()/오류처리 사용
const BASE_URL = 'https://sprint-mission-api.vercel.app/articles';

function getArticleList(page = 1, pageSize = 100, keyword = "") {

  const url = new URL(BASE_URL);
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }

  return fetch(url)
    .then(response => {
      if(!response.ok){//!200, 400/500 에러발생
        throw new Error(`[ERROR] getArticleList failed: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {//네트워크오류, throw된에러
      console.error(`[CATCH] Network or Fetch Error: ${error.message}`);
      return null;
    })
}

function getArticle(id){
  return fetch(`${BASE_URL}/${id}`)
    .then(response => {
      if(!response.ok){
        throw new Error(`[ERROR] getArticle failed: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => { 
      console.error(`[CATCH] Network or Fetch Error: ${error.message}`);
      return null;
    })
}

function createArticle({title, content, image}){
  return fetch(BASE_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title, content, image}),
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`[ERROR] createArticle failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => { 
    console.error(`[CATCH] Network or Fetch Error: ${error.message}`);
    return null;
  })
}

function patchArticle(id, updateData){
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updateData),
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`[ERROR] patchArticle failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => { 
    console.error(`[CATCH] Network or Fetch Error: ${error.message}`);
    return null;
  })
}

function deleteArticle(id){
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`[ERROR] deleteArticle failed: ${response.status}`);
    }
    console.log(`[SUCCESS] Article ${id} deleted`);
    return response.ok;
  })
  .catch(error => { 
    console.error(`[CATCH] Network or Fetch Error: ${error.message}`);
    return false;
  })
}


export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
}
