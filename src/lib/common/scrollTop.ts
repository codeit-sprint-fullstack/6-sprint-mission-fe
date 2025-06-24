export function scrollToTop(smooth = false) {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    }, 10); // 마이크로태스크 끝난 직후에 스크롤 실행
  }
}
