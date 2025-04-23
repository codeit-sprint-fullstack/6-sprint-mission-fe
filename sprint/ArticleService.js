export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const url = new URL("https://sprint-mission-api.vercel.app/articles");
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  return fetch(url)
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
}

export function getArticle(id) {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
}

export async function createArticle(articleData) {
  const res = await fetch("https://sprint-mission-api.vercel.app/articles", {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }
  const data = await res.json();
  return data;
}

export function patchArticle(id, articleData) {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: "PATCH",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
}

export function deleteArticle(id) {
  return fetch(`https://sprint-mission-api.vercel.app/articles/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
}
