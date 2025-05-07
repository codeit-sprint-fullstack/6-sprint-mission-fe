/**
 * 페이지를 최상단으로 부드럽게 스크롤합니다.
 *
 * @function scrollToTop
 * @param {boolean} [smooth=false] - `true`일 경우 부드러운 스크롤로 이동하고, `false`일 경우 즉시 이동합니다.
 * @returns {void}
 *
 * @example
 * scrollToTop();       //  즉시 최상단 이동
 * scrollToTop(true);  // 부드럽게 최상단 이동
 */
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
