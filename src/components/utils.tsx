// 천 단위마다 콤마(,)를 찍어주는 함수
export function formatNumber(num: number): string {
  if (typeof num !== "number") return String(num);
  return num.toLocaleString("ko-KR");
} 