/**
 * 가격을 포맷팅하는 함수
 * @param {number} price - 포맷팅할 가격
 * @returns {string} - 포맷팅된 가격 (예: 1,000,000)
 */
export function formatPrice(price) {
  if (!price && price !== 0) return "가격 없음";

  return new Intl.NumberFormat("ko-KR").format(price);
}

/**
 * 날짜를 포맷팅하는 함수
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} - 포맷팅된 날짜 (예: 2024. 01. 02)
 */
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
