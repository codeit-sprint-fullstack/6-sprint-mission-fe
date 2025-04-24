export const userApi = {
  // 사용자 정보 요청
  getUser: async () => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch("/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("유저 정보를 가져오는데 실패했습니다.");
    }

    return await res.json();
  },

  // 사용자 정보 업데이트
  updateUser: async (formData) => {
    const token = localStorage.getItem("accessToken");

    const res = await fetch("/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("유저 정보 업데이트에 실패했습니다.");
    }

    return await res.json();
  },

  // 사용자 비밀번호 업데이트
  updatePaasword: async (formData) => {
    const token = localStorage.getItem("accessToken");

    const res = await axios.patch("/user/me/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("비밀번호 업데이트에 실패했습니다.");
    }

    return await res.json();
  },
};
