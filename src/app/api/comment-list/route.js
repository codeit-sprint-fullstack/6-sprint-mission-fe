import { NextResponse } from "next/server";

export async function GET() {
  try {
    const comments = await getAllComments();
    return NextResponse.json(comments);
  } catch (e) {
    return NextResponse.json(
      { error: "댓글 목록 데이터를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
