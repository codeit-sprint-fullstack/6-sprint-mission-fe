import axios from "axios";

const BASE_URL = "https://panda-market-api.onrender.com/articles";

// 댓글 전체 조회
export const getComments = async (articleId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${articleId}/comments`);
    return res.data;
  } catch (e) {
    console.error("댓글을 가져오는데 실패했습니다.", e);
    throw e;
  }
};

// 댓글 등록
export const createComment = async (articleId, params) => {
  try {
    const res = await axios.post(`${BASE_URL}/${articleId}/comments`, params);
    return res.data;
  } catch (e) {
    console.error("댓글 등록을 실패했습니다.", e);
    throw e;
  }
};

// 댓글 수정
export const updateComment = async (articleId, commentId, params) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/${articleId}/comments/${commentId}`,
      params
    );
    return res.data;
  } catch (e) {
    console.error("댓글 수정을 실패했습니다.", e);
    throw e;
  }
};

// 댓글 삭제
export const deleteComment = async (articleId, commentId) => {
  try {
    await axios.delete(`${BASE_URL}/${articleId}/comments/${commentId}`);
  } catch (e) {
    console.error("댓글 삭제를 실패했습니다.", e);
    throw e;
  }
};
