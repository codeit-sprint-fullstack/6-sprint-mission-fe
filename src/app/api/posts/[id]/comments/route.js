let mockComments = {
  1: [
    {
      id: "c1",
      content: "좋은 정보 감사합니다!",
      createdAt: "2024-04-16T12:30:00Z",
    },
    {
      id: "c2",
      content: "가격 궁금했는데 도움됐어요.",
      createdAt: "2024-04-16T13:00:00Z",
    },
  ],
  // '2': [], ...
};

export async function GET(request, { params }) {
  const { id } = params;
  const comments = mockComments[id] || [];
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const newComment = {
    id: String(Date.now()),
    content: body.content,
    createdAt: new Date().toISOString(),
  };

  if (!mockComments[id]) mockComments[id] = [];
  mockComments[id].push(newComment);

  return new Response(JSON.stringify(newComment), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
