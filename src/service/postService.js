import { tokenFetch } from "./fetchClient";

// TODO: 내가 만든 API 연결하면, API 경로를 최대한 article과 똑같은 경로로 만들어서 article에서도 사용하기.
// TODO: 좋아요는 favorite말고 like로 만들어서 경로도 수정하기.
export const postService = {
  getPosts: (type, query) => tokenFetch(`/${type}?${query}`),

  getPost: (type, id) => tokenFetch(`/${type}/${id}`),

  createPost: (type, body) =>
    tokenFetch(`/${type}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updatePost: (type, id, body) =>
    tokenFetch(`/${type}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deletePost: (type, id) =>
    tokenFetch(`/${type}/${id}`, {
      method: "DELETE",
    }),

  like: (type, id) =>
    tokenFetch(`/${type}/${id}/favorite`, {
      method: "POST",
    }),

  unlike: (type, id) =>
    tokenFetch(`/${type}/${id}/favorite`, {
      method: "DELETE",
    }),
};
