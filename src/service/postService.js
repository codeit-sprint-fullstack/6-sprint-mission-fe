import { multipartFetch, tokenFetch } from "./fetchClient";

export const postService = {
  getPosts: (type, query) => {
    const queryString = new URLSearchParams(query).toString();
    return tokenFetch(`/${type}?${queryString}`);
  },

  getPost: (type, id) => tokenFetch(`/${type}/${id}`),

  createPost: (type, body) =>
    type === "articles"
      ? tokenFetch(`/${type}`, {
          method: "POST",
          body: JSON.stringify(body),
        })
      : multipartFetch(`/${type}`, {
          method: "POST",
          body,
        }),

  updatePost: (type, id, body) =>
    type === "articles"
      ? tokenFetch(`/${type}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        })
      : multipartFetch(`/${type}/${id}`, {
          method: "PATCH",
          body,
        }),

  deletePost: (type, id) =>
    tokenFetch(`/${type}/${id}`, {
      method: "DELETE",
    }),

  like: (type, id) =>
    tokenFetch(`/${type}/${id}/like`, {
      method: "POST",
    }),

  unlike: (type, id) =>
    tokenFetch(`/${type}/${id}/like`, {
      method: "DELETE",
    }),
};
