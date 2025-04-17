const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`;

// 게시글 전체 조회
export const getArticles = async (params) => {
  const query = new URLSearchParams(params);

  const res = await fetch(`${BASE_URL}?${query}`);

  if (!res) {
    throw new Error("게시글을 찾을 수 없습니다");
  }

  const data = await res.json();

  return data;
};

// 게시글 상세 조회
export const getArticle = async (articleId) => {
  const res = await fetch(`${BASE_URL}/${articleId}`);

  if (!res) throw new Error("게시글을 찾을 수 없습니다");

  const data = await res.json();

  return data;
};

// 게시글 작성
export const postArticle = async (body) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res) throw new Error("게시글을 등록할 수 없습니다");

  return res.json();
};

// 게시글 수정
export const patchArticle = async (articleId, body) => {
  const res = await fetch(`${BASE_URL}/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res) throw new Error("게시글을 수정할 수 없습니다");

  return res.json();
};

// 게시글 삭제
export const deleteArticle = async (articleId) => {
  const res = await fetch(`${BASE_URL}/${articleId}`, {
    method: "DELETE",
  });

  if (!res) throw new Error("게시글을 삭제할 수 없습니다");
};
