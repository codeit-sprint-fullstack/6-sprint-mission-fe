import axios from "axios";

const BASE_URL = "https://panda-market-api.onrender.com/articles";

// 게시글 전체 조회
export async function getArticles() {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (e) {
    console.error("게시글 목록을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 게시글 등록
export async function createArticle(params) {
  try {
    const res = await axios.post(BASE_URL, params);
    return res.data;
  } catch (e) {
    console.error("게시글 등록을 실패했습니다.", e);
    throw e;
  }
}

// 게시글 상세 조회
export async function getArticle(articleId) {
  try {
    const res = await axios.get(`${BASE_URL}/${articleId}`);
    return res.data;
  } catch (e) {
    console.error("게시글을 불러오는데 실패했습니다.", e);
    throw e;
  }
}

// 게시글 수정
export async function updateArticle(articleId, params) {
  try {
    const res = await axios.patch(`${BASE_URL}/${articleId}`, params);
    return res.data;
  } catch (e) {
    console.error("게시글 수정을 실패했습니다.", e);
    throw e;
  }
}

// 게시글 삭제
export async function deleteArticle(articleId) {
  try {
    const res = await axios.delete(`${BASE_URL}/${articleId}`);
    return res.data;
  } catch (e) {
    console.error("게시글 삭제를 실패했습니다.", e);
    throw e;
  }
}
