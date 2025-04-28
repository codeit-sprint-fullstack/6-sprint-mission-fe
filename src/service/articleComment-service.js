const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`;

// // 게시글 댓글 조회
// export const getArticleComments = async ({articleId = null, productId = null}) => {
//   const path = articleId ? `articles/${articleId}` : `products/${productId}`

//   const res = await fetch(`${BASE_URL}/${path}/comments`);

//   if (!res) throw new Error("댓글을 불러올 수 없습니다");

//   return res.json();
// };

// 게시글 댓글 조회
export const getArticleComments = async (articleId) => {
  const res = await fetch(`${BASE_URL}/${articleId}/comments`);

  if (!res) throw new Error("댓글을 불러올 수 없습니다");

  return res.json();
};

// 게시글 댓글 작성
export const postArticleComment = async (articleId, body) => {
  const res = await fetch(`${BASE_URL}/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res) throw new Error("댓글을 작성할 수 없습니다");

  return res.json();
};

// 게시글 댓글 수정
export const patchArticleComment = async (articleId, commentId, body) => {
  const res = await fetch(`${BASE_URL}/${articleId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res) throw new Error("댓글을 수정할 수 없습니다");

  return res.json();
};

// 게시글 댓글 삭제
export const deleteArticleComment = async (articleId, commentId) => {
  const res = await fetch(`${BASE_URL}/${articleId}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res) throw new Error("댓글을 삭제할 수 없습니다");
};
