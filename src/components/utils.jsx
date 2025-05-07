// 천 단위마다 콤마(,)를 찍어주는 함수
export function formatNumber(num) {
  if (typeof num !== "number") return num;
  return num.toLocaleString("ko-KR");
}
