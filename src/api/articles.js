// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7777";
// const API_BASE_URL = "http://localhost:7777";

// 환경 정보 로깅 (개발 중에만 표시)
if (process.env.NODE_ENV !== "production") {
  console.log("현재 환경:", process.env.NODE_ENV);
  console.log("API URL:", API_BASE_URL);
}

/**
 * 게시글 목록 조회
 * @param {Object} params - 검색 파라미터
 * @param {number} params.offset - 페이지 오프셋
 * @param {number} params.limit - 한 페이지당 항목 수
 * @param {string} params.search - 검색어
 * @param {string} params.sort - 정렬 방식 ("latest" 또는 "popular")
 * @returns {Promise<Object>} 게시글 목록 및 페이지네이션 정보
 */
export async function getArticles({
  offset = 0,
  limit = 10,
  search = "",
  sort = "latest",
} = {}) {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append("offset", offset);
    queryParams.append("limit", limit);
    queryParams.append("sort", sort);
    if (search) queryParams.append("search", search);

    const response = await fetch(
      `${API_BASE_URL}/articles?${queryParams.toString()}`,
    );

    if (!response.ok) {
      throw new Error("게시글 목록을 불러오는데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 목록 조회 오류:", error);
    throw error;
  }
}

/**
 * 특정 게시글 조회
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<Object>} 게시글 정보
 */
export async function getArticle(articleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`);

    if (!response.ok) {
      throw new Error("게시글을 불러오는데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 조회 오류:", error);
    throw error;
  }
}

/**
 * 게시글 작성
 * @param {Object} articleData - 게시글 데이터
 * @param {string} articleData.title - 게시글 제목
 * @param {string} articleData.content - 게시글 내용
 * @returns {Promise<Object>} 생성된 게시글 정보
 */
export async function createArticle({ title, content }) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("게시글 작성에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    throw error;
  }
}

/**
 * 게시글 수정
 * @param {string} articleId - 게시글 ID
 * @param {Object} articleData - 게시글 데이터
 * @param {string} [articleData.title] - 게시글 제목
 * @param {string} [articleData.content] - 게시글 내용
 * @returns {Promise<Object>} 수정된 게시글 정보
 */
export async function updateArticle(articleId, { title, content }) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("게시글 수정에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 수정 오류:", error);
    throw error;
  }
}

/**
 * 게시글 삭제
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<Object>} 삭제 결과 메시지
 */
export async function deleteArticle(articleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("게시글 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 삭제 오류:", error);
    throw error;
  }
}

/**
 * 게시글에 달린 댓글 목록 조회
 * @param {string} articleId - 게시글 ID
 * @returns {Promise<Object>} 댓글 목록
 */
export async function getComments(articleId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles/${articleId}/comments`,
    );

    if (!response.ok) {
      throw new Error("댓글 목록을 불러오는데 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("댓글 목록 조회 오류:", error);
    throw error;
  }
}

/**
 * 댓글 작성
 * @param {string} articleId - 게시글 ID
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} 생성된 댓글 정보
 */
export async function createComment(articleId, { content }) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    if (!response.ok) {
      throw new Error("댓글 작성에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    throw error;
  }
}

/**
 * 댓글 수정
 * @param {string} articleId - 게시글 ID
 * @param {string} commentId - 댓글 ID
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} 수정된 댓글 정보
 */
export async function updateComment(articleId, commentId, { content }) {
  const url = `${API_BASE_URL}/articles/${articleId}/comments/${commentId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("서버 응답:", response.status, errorText);
      throw new Error(
        `댓글 수정 실패: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("댓글 수정 오류:", error);
    throw error;
  }
}

/**
 * 댓글 삭제
 * @param {string} articleId - 게시글 ID
 * @param {string} commentId - 댓글 ID
 * @returns {Promise<Object>} 삭제 결과 메시지
 */
export async function deleteComment(articleId, commentId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles/${articleId}/comments/${commentId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("댓글 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    throw error;
  }
}
