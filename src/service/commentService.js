import { tokenFetch } from "./fetchClient";

// TODO: 인피니티스크롤 구현하게 되면, query 동적으로 변경해주기.
// TODO: API에 list로 배열을 받아야 되나? 한번 생각해보기
export const commentService = {
  getComments: (type, id) => tokenFetch(`/${type}/${id}/comments?limit=5`),

  createComment: (type, id, body) =>
    tokenFetch(`/${type}/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateComment: (type, id, commentId, body) =>
    tokenFetch(`/${type}/${id}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteComment: (type, id, commentId) =>
    tokenFetch(`/${type}/${id}/comments/${commentId}`, {
      method: "DELETE",
    }),
};
