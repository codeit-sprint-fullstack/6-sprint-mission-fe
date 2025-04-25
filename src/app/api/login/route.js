const API_URL = "https://panda-market-api.vercel.app";

//로그인 리퀘스트 라우터
// export async function POST(req) {
//   const body = await req.json();

//   const res = await fetch(`${API_URL}/auth/signIn`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     credentials: "include",
//   });

//   const data = await res.json();

//   return Response.json(data, { status: res.status });
// }
