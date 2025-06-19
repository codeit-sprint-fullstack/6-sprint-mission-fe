import { tokenFetch } from "./fetchClient";

// TODO: 인피니티스크롤 구현하게 되면, query 동적으로 변경해주기.
export const commentService = {
  getComments: (type: string, id: string) =>
    tokenFetch(`/${type}/${id}/comments?limit=5`),

  createComment: (type: string, id: string, body: { content: string }) =>
    tokenFetch(`/${type}/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateComment: (
    type: string,
    id: string,
    commentId: number,
    body: { content: string }
  ) =>
    tokenFetch(`/${type}/${id}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteComment: (type: string, id: string, commentId: number) =>
    tokenFetch(`/${type}/${id}/comments/${commentId}`, {
      method: "DELETE",
    }),
};
