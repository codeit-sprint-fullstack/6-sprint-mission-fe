// 기존 mockPosts 배열 위에 위치할 수 있음
let mockPosts = [
  {
    id: "1",
    title: "맥북 16인치 16기가 1테라 정도 사용이면 얼마에 팔아야 하나요?",
    content: "맥북 중고가격 궁금해요!",
    image: null,
    createdAt: "2024-04-16T12:00:00Z",
  },
  // ...
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") || "latest";
  const keyword = searchParams.get("search") || "";
  const limit = searchParams.get("limit");

  let filtered = mockPosts.filter((post) =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (sort === "latest") {
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }

  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const { title, content } = body;

  const newPost = {
    id: String(Date.now()), // 간단한 ID
    title,
    content,
    image: null,
    createdAt: new Date().toISOString(),
  };

  mockPosts.push(newPost);

  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
