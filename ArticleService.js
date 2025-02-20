import axios from "axios"; //axios는 내부적으로 encodeURIComponent()를 사용하여 검색어(keyword)를 자동으로 인코딩해줌

const url = new URL('https://sprint-mission-api.vercel.app/articles');

export const getArticleList = (page = 1, pageSize = 50, keyword = '') => {
    return axios.get(url, { params: { page, pageSize, keyword } })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to fetch article list:', error);
        });
};

export const getArticle = (id) => {
    return axios.get(`${url}/${id}`)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error(`Failed to fetch article with ID ${id}:`, error);
        });
};

export const createArticle = (title, content, image) => {
    return axios.post(url, { title, content, image })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to create article:', error);
        });
};

export const patchArticle = (id, updatedFields) => {
    return axios.patch(`${url}/${id}`, updatedFields)
        .then(response => response.data)
        .catch(error => {
            console.error(`Failed to update article with ID ${id}:`, error);
        });
};

export const deleteArticle = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(() => ({ message: 'Article deleted successfully' }))
        .catch(error => {
            console.error(`Failed to delete article with ID ${id}:`, error);
        });
};