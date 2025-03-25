import axios from 'axios'; // 현재 파일에서 axios를 가져오기 위해 선언

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postArticle = async (data) => {
    const response = await axios.post(`${BASE_URL}/articles`, data);
    return response.data; // 서버가 보내준 데이터만 클라이언트에 전달
}

export const getArticles = async () => {
    const response = await axios.get(`${BASE_URL}/articles`);
    return response.data;
}

export const patchArticles = async (id, data) => {
    const response = await axios.patch(`${BASE_URL}/articles/${id}`, data);
    return response.data;
}