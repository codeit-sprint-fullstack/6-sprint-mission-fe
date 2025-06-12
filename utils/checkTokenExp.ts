interface JwtPayload {
  exp: number;
}

//현 시각과 비교
export const checkTokenExp = (): boolean => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) throw new Error("accessToken이 존재하지 않습니다.");

    const payload = accessToken.split(".")[1];
    if (!payload) throw new Error("accessToken 형식이 올바르지 않습니다.");

    //토큰의 유효기간
    const expiryToken = JSON.parse(atob(payload)).exp * 1000;

    if (Date.now() <= expiryToken) {
      console.log("유효한 토큰입니다.");
      return true;
    } else {
      console.error("유효하지 않은 토큰입니다.");
      localStorage.removeItem("accessToken");
      return false;
    }
  } catch (e) {
    console.log("accessToken 유효성 검사 실패", e);
    return false;
  }
};
