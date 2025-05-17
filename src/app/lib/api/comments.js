const API_URL = "https://panda-market-api.vercel.app";

export async function addComment({ productId, content }) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
    if (!response.ok) {
      throw new Error("댓글 작성에 실패했습니다");
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
export async function getComments(productId) {
  try {
    const response = await fetch(
      `${API_URL}/products/${productId}/comments?limit=3`
    );
    if (!response.ok) {
      throw new Error("댓글을 가져오는데 실패했습니다.");
    }
    const data = response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch");
  }
}
