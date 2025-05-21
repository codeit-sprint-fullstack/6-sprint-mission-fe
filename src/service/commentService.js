import { tokenFetch } from "./fetchClient";

// TODO: 내가 만든 API로 변경하면,
// 1. 'articleCommentService' 참고해서 URL만 내가 만든 것으로 변경하고 파일은 삭제하기.
// 2. 매개변수가 달라졌다면, 사용하고 있는 곳에서도 매개변수 변경에 맞춰서 수정해주기.
export const commentService = {
  getComments: (type, id) => tokenFetch(`/${type}/${id}/comments?limit=5`),

  createComment: (type, id, body) =>
    tokenFetch(`/${type}/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateComment: (commentId, body) =>
    tokenFetch(`/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteComment: (commentId) =>
    tokenFetch(`/comments/${commentId}`, {
      method: "DELETE",
    }),
};
