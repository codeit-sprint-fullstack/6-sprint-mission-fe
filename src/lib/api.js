const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 게시글 전체 조회
export async function getArticles(query = "") {
  let url = `${BASE_URL}/articles`;

  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("게시글 불러오기에 실패했습니다");

  return res.json();
}

// 게시글 상세 조회
export const getArticle = async (articleId) => {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`);
  if (!res.ok) throw new Error("게시글을 불러올 수 없습니다");
  return res.json();
};

// 게시글 작성
export const postArticle = async (body) => {
  const res = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body), 
  });

  if (!res.ok) throw new Error("게시글 작성에 실패했습니다");

  return res.json();
};

// 게시글 수정
export const patchArticle = async (articleId, body) => {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("게시글 수정에 실패했습니다");
  return res.json();
};

// 게시글 삭제
export const deleteArticle = async (articleId) => {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("게시글 삭제에 실패했습니다");
};

// 댓글 작성 (boardType: "market" 또는 "freeboard")
export const postComment = async (boardType, articleId, body) => {
  const res = await fetch(`${BASE_URL}/comments/${boardType}/${articleId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("댓글 작성에 실패했습니다");
  return res.json();
};

// 댓글 수정
export const patchComment = async (boardType, articleId, commentId, body) => {
  const res = await fetch(
    `${BASE_URL}/comments/${boardType}/${articleId}/${commentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error("댓글 수정에 실패했습니다");
  return res.json();
};

// 댓글 삭제
export const deleteComment = async (boardType, articleId, commentId) => {
  const res = await fetch(
    `${BASE_URL}/comments/${boardType}/${articleId}/${commentId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("댓글 삭제에 실패했습니다");
};

// 댓글 목록 조회 (Cursor 기반)
export const getComments = async (boardType, articleId, params = {}) => {
  const query = new URLSearchParams(params);
  const res = await fetch(
    `${BASE_URL}/comments/${boardType}/${articleId}?${query}`
  );
  if (!res.ok) throw new Error("댓글 목록을 불러올 수 없습니다");
  return res.json(); // { comments: [], nextCursor: number | null }
};
