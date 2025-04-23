const baseURL = "https://fanda-api-prisma.onrender.com/article";

// 게시글 목록 가져오기
export const getArticle = async (search) => {
  const query = search ? `?search=${search}` : "";
  const res = await fetch(`${baseURL}${query}`);

  if (!res.ok) {
    throw new Error("데이터를 가져오지 못 했습니다");
  }

  return res.json();
};

// 상세 게시글 가져오기 + 댓글 가져오기
export const getDetailArticle = async (articleId) => {
  try {
    const res = await fetch(`${baseURL}/${articleId}`);

    return res.json();
  } catch (e) {
    console.log(e);
  }
};

// 게시글 작성
export const postArticle = async (data) => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`서버 에러 ${res.status}`);
    }

    const result = await res.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

// 댓글 작성
export const postComment = async (data, articleId) => {
  try {
    const res = await fetch(`${baseURL}/${articleId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`서버에러 ${res.status}`);
    }

    const result = await res.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};
