// [ x ] ArticleService.js 파일에 Article API 관련 함수들을 작성해 주세요.

const baseURL = 'https://sprint-mission-api.vercel.app/articles'

// [ ] page, pageSize, keyword 쿼리 파라미터를 이용해 주세요.

// [ ] getArticleList() : GET 메서드를 사용해 주세요.

export const getArticleList = async (page, pageSize, keyword) => {
    fetch(`${baseURL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
        .then((response) => {
            if(!response.ok) {
                throw new Error (`Status : ${response.status}`)
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}


// getArticle
export const getArticle = async (id) => {
    fetch(`${baseURL}/${id}`)
        .then((response) =>{
            if(!response.ok) {
                throw new Error (`Status : ${response.statusText}`)
            }
            return response.json()
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}


// [ ] createArticle() : POST 메서드를 사용해 주세요.
export async function createArticle(title, content, image) {
    fetch(`${baseURL}`,{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title : title,
            content : content,
            image : image
        })
    })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`Status ${response.statusText}`)
            }
            return response.json()
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}


// [ ] patchArticle() : PATCH 메서드를 사용해 주세요.
export async function patchArticle(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            title: 'HSJ 수정 타이틀',
            content: 'HSJ 수정 컨텐츠',
            image: 'https://naver.jpg',
        })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Status ${response.statusText}`)
        }
        return response.json()
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
}


// [ ] deleteArticle() : DELETE 메서드를 사용해 주세요.
export async function deleteArticle(id) {
    fetch(`${baseURL}/${id}`, {
            method: 'DELETE'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Status : ${response.statusText}`)
            }
            return response.json()
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
}

