import axios from 'axios';

const baseURL = 'https://panda-market-api-crud.vercel.app/articles'

const instance = axios.create({ baseURL });

const handleError = (error) => {
    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response Data:", error.response.data);
    } else if (error.request) {
        console.log("No Response from Server:", error.request);
    } else {
        console.log("Request Error:", error.message);
    }
    console.log("Request Config:", error.config);
};

// 응답의 상태 코드가 2XX가 아닐 경우, 에러메시지를 콘솔에 출력
const checkStatus = (res, errorMessage) => {
    if (res.status < 200 || res.status >= 300) {
        console.log(errorMessage, `Status Code: ${res.status}`);
        throw new Error(errorMessage);
    }
    return res.data;
};

// 게시글 목록조회(getArticleList)
async function getArticleList(page = 1, pageSize = 10, keyword = "") {
    return instance.get("/", { params: { page, pageSize, keyword } })
        .then(res => checkStatus(res, "게시글 목록 조회 실패"))
        .catch(error => {
            handleError(error);
        }); 
};

// 특정 게시글 조회(getArticle)
async function getArticle(id) {
    return instance.get(`/${id}`)
        .then(res => checkStatus(res, "게시글 조회 실패"))
        .catch(error => {
            handleError(error);
        });    
}


// 게시글 생성(createArticle)
async function createArticle(title, content, image) {
    return instance.post("/", { title, content, image })
        .then(res => checkStatus(res, "게시글 생성 실패"))
        .catch(error => {
            handleError(error);
        });        
}


// 게시글 수정(patchArticle)
async function patchArticle(id, updateData) {
    return instance.patch(`/${id}`, updateData)
        .then(res => checkStatus(res, "게시글 수정 실패"))
        .catch(error => {
            handleError(error);
        });      
}


// 게시글 삭제(deleteArticle)
async function deleteArticle(id, password) {
    return instance.delete(`/${id}`, { data: { password } })
        .then(res => checkStatus(res, "게시글 삭제 실패"))
        .catch(error => {
            handleError(error);
        });        
}

export {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
};