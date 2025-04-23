export async function PATCH(request, { params }) {
  const { id, commentId } = params;
  const body = await request.json();

  const commentList = mockComments[id] || [];
  const comment = commentList.find((c) => c.id === commentId);
  if (!comment) return new Response(null, { status: 404 });

  comment.content = body.content;
  return new Response(JSON.stringify(comment), { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id, commentId } = params;

  if (!mockComments[id]) return new Response(null, { status: 404 });

  mockComments[id] = mockComments[id].filter((c) => c.id !== commentId);

  return new Response(null, { status: 204 });
}
