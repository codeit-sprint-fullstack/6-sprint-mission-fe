import axios from "axios"; //axios는 내부적으로 encodeURIComponent()를 사용하여 검색어(keyword)를 자동으로 인코딩해줌

const url = new URL('https://sprint-mission-api.vercel.app/articles');

export const getArticleList = async (page = 1, pageSize = 50, keyword = '') => {
  try {
      const response = await axios.get(url, {
          params: { page, pageSize, keyword }
      });
      return response.data;
  } catch (error) {
      console.error('Failed to fetch article list:', error);
  }
};

export const getArticle = async (id) => {
  try {
      const response = await axios.get(`${url}/${id}`);
      console.log(response.data);
  } catch (error) {
      console.error(`Failed to fetch article with ID ${id}:`, error);
  }
};

export const createArticle = async (title, content, image) => {
  try {
      const response = await axios.post(url, { title, content, image });
      return response.data;
  } catch (error) {
      console.error('Failed to create article:', error);
  }
};

export const patchArticle = async (id, updatedFields) => {
  try {
      const response = await axios.patch(`${url}/${id}`, updatedFields);
      return response.data;
  } catch (error) {
      console.error(`Failed to update article with ID ${id}:`, error);
  }
};

export const deleteArticle = async (id) => {
  try {
      await axios.delete(`${url}/${id}`);
      return { message: 'Article deleted successfully' };
  } catch (error) {
      console.error(`Failed to delete article with ID ${id}:`, error);
  }
};