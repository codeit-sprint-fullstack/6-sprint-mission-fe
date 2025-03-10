import { useState, useEffect } from "react";

//브라우저의 넓이와 높이를 리턴해주는 함수
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

//resize 이벤트가 발생할때마다 브라우저의 넓이 상태를 변경해주는 함수
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
