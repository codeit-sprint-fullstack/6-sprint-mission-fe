import { multipartFetch, tokenFetch } from "./fetchClient";

type TGetPostsQuery = {
  offset: number;
  limit: number;
  orderBy: string;
  keyword: string;
};

type TPostServiceBody = FormData | { title: string; content: string };

export const postService = {
  getPosts: (type: string, query: TGetPostsQuery) => {
    const params = {
      ...query,
      offset: String(query.offset),
      limit: String(query.limit),
    };

    const queryString = new URLSearchParams(params).toString();
    return tokenFetch(`/${type}?${queryString}`);
  },

  getPost: (type: string, id: string) => tokenFetch(`/${type}/${id}`),

  createPost: (type: string, body: TPostServiceBody) =>
    type === "articles"
      ? tokenFetch(`/${type}`, {
          method: "POST",
          body: JSON.stringify(body),
        })
      : multipartFetch(`/${type}`, {
          method: "POST",
          body,
        }),

  updatePost: (type: string, id: string, body: TPostServiceBody) =>
    type === "articles"
      ? tokenFetch(`/${type}/${id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        })
      : multipartFetch(`/${type}/${id}`, {
          method: "PATCH",
          body,
        }),

  deletePost: (type: string, id: string) =>
    tokenFetch(`/${type}/${id}`, {
      method: "DELETE",
    }),

  like: (type: string, id: string) =>
    tokenFetch(`/${type}/${id}/like`, {
      method: "POST",
    }),

  unlike: (type: string, id: string) =>
    tokenFetch(`/${type}/${id}/like`, {
      method: "DELETE",
    }),
};
