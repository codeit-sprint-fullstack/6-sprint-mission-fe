// 베스트로 정렬된 게시글 3개 가져옴
export async function getBestArticles() {
  const limit = 3;
  const res = await fetch(`http://localhost:3000/articles?take=3`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("베스트 게시글 목록을 가져오는데 실패했습니다");
  }

  return res.json();
}

//최신순/좋아요순 정렬된 게시글 목록 가져옴 (3~5개)
export async function getArticles() {
  const res = await fetch(`http://localhost:3000/articles?take=4`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("게시글 목록을 가져오는데 실패했습니다");
  }

  return res.json();
}

//특정 게시글 조회
export async function getArticle(articleId) {
  const res = await fetch(`http://localhost:3000/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("해당 게시글을 가져올 수 없습니다.");
  }
  return res.json();
}
