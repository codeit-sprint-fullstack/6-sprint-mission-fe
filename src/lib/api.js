const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 유저 확인
export async function getMe(accessToken) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("유저 정보 가져오기 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getMe 에러:", error);
    throw error;
  }
}

// 회원가입
export const signUp = async (email, password, nickname) => {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      nickname,
      passwordConfirmation: password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "회원가입 실패");
  }

  return await response.json();
};

// 로그인
export const signIn = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "로그인 실패");
  }

  return await response.json();
};

// 게시글 전체 조회 (자유게시판)
export async function getArticles({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("pageSize", pageSize);
  params.append("orderBy", orderBy);

  if (keyword) {
    params.append("keyword", keyword);
  }

  const url = `${BASE_URL}/articles?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("게시글 불러오기에 실패했습니다");

  return await res.json();
}

// 게시글 전체 조회 (중고마켓)
export async function getMarketArticles() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("게시글 불러오기에 실패했습니다");

  return await res.json();
}

// 게시글 상세 조회
export const getArticle = async (articleId) => {
  const res = await fetch(`${BASE_URL}/articles/${articleId}`);
  if (!res.ok) throw new Error("게시글을 불러올 수 없습니다");
  const body = await res.json();
  return body;
};

// 게시글 작성
export const postArticle = async ({ content, title }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content, title }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "게시글 작성에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    throw error;
  }
};

// 게시글 수정
export const patchArticle = async (articleId, body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "게시글 수정에 실패했습니다");
    }

    return res.json();
  } catch (error) {
    console.error("게시글 수정 오류:", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteArticle = async (articleId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "게시글 삭제에 실패했습니다");
    }
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    throw error;
  }
};

// 댓글 작성 (boardType: articles 또는 products)
export const postComment = async (boardType, articleId, { content }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await fetch(`${BASE_URL}/${boardType}/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) throw new Error("댓글 작성에 실패했습니다");

    return await res.json();
  } catch (err) {
    console.error("댓글 작성 오류:", err);
    throw err;
  }
};

// 댓글 수정
export const patchComment = async (boardType, articleId, body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await fetch(`${BASE_URL}/${boardType}/${articleId}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("댓글 수정에 실패했습니다");

    return res.json();
  } catch (err) {
    console.error("댓글 수정 오류:", err);
    throw err;
  }
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
export const getComments = async (articleId, limit = 10, cursor = null) => {
  const params = new URLSearchParams();
  params.append("limit", limit);
  if (cursor !== null) params.append("cursor", cursor);

  const res = await fetch(
    `${BASE_URL}/articles/${articleId}/comments?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("댓글을 불러오는 데 실패했습니다.");
  }

  const data = await res.json();
  return data;
};
