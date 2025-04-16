import axios from "axios";

const BASE_URL = "https://panda-market-api.onrender.com/articles";

export async function getArticle() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (e) {
    console.error("게시글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}

export async function createArticle(params) {
  try {
    const res = await axios.post(BASE_URL, params);
    return res.data;
  } catch (e) {
    console.error("게시글 등록을 실패했습니다.", e);
    throw e;
  }
}
