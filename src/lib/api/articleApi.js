import axios from "axios";

const BASE_URL = "https://panda-market-api.onrender.com/articles";

export default async function getArticle() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (e) {
    console.error("게시글을 가져오는데 실패했습니다.", e);
    throw e;
  }
}
