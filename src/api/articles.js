const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getArticles({ cursor = 0, take = 10, orderBy = "recent", word = "" }) {
  const queryParams = new URLSearchParams();

  if (cursor) queryParams.append("cursor", cursor);
  if (take) queryParams.append("take", take);
  // is set for "recent" (hardcoded) due to schema model for Article not having "likes" field for now
  if (orderBy) queryParams.append("orderBy", "recent");
  // if (orderBy) queryParams.append("orderBy", orderBy); -> use this once likes field is implemented in Article model
  if (word) queryParams.append("word", word);

  try {
    const response = await fetch(`${API_BASE_URL}/articles?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Error fetching articles: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}
// result example
// {
//   "data": [
//     {
//       "id": 1,
//       "title": "게시글 제목",
//       "content": "게시글 내용",
//       "createdAt": "2024-07-15T00:00:00.000Z"
//     }
//   ],
//   "nextCursor": 10,
//   "hasMore": true
// }

export async function getArticleDetail(articleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`);

    if (!response.ok) {
      throw new Error(`Error fetching article: ${response.statusText}`);
    }

    return await response.json(); // Assuming the backend returns just the article object
  } catch (error) {
    console.error("Failed to fetch article detail:", error);
    throw error;
  }
}