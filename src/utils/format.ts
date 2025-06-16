export function formatPrice(price: number) {
  if (!price && price !== 0) return "가격 없음";

  return new Intl.NumberFormat("ko-KR").format(price);
}

export function formatDate(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
