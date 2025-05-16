import { multipartFetch, tokenFetch } from "./fetchClient";

// TODO: 좋아요는 favorite말고 like로 만들어서 경로도 수정하기.
// TODO: API에 list 없앨지 고민(백엔드 수정해야 함)
export const postService = {
  getPosts: (type, query) => {
    const queryString = new URLSearchParams(query).toString();
    return tokenFetch(`/${type}?${queryString}`);
  },

  getPost: (type, id) => tokenFetch(`/${type}/${id}`),

  createPost: (type, body) =>
    multipartFetch(`/${type}`, {
      method: "POST",
      body,
    }),

  updatePost: (type, id, body) =>
    multipartFetch(`/${type}/${id}`, {
      method: "PATCH",
      body,
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
